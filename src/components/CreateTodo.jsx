import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate, useSearchParams } from 'react-router-dom'
import axios from 'axios'
import Cookies from 'js-cookie'


const CreateTodo = () => {

    const [searchParams] = useSearchParams();
    const id = searchParams.get("id");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const todo = useSelector((state) => state.todo) || []

    const [detail, setDetail] = useState({
        title: "",
        description: "",
        status: "pending"
    })

    const handleChange = (e) => {
        setDetail({
            ...detail, [e.target.name]: e.target.value
        })
    }
    const handleAddTodo = async () => {
        try {
            const token = Cookies.get("token")
            const res = await axios.post(
                "http://192.168.1.128/todo/index.php/api/createtask",
                detail,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (res.data.status) {
                dispatch({
                    type: 'todo/createTodo',
                    payload: {
                        ...detail,
                        id: res.data.id

                    }
                })
                navigate('/')
                setDetail({
                    title: "",
                    description: "",
                    status: ""
                });

            }

        } catch (error) {
            console.error("failed to create task", error);
        }
    }

    const handleUpdate = async () => {
        try {
            const body = { ...detail, id }
            console.log(id, "id here")
            const token = Cookies.get("token")
            const res = await axios.put(
                "http://192.168.1.128/todo/index.php/api/updatetask",
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`

                    }
                }
            );
            if (res.data.status) {
                dispatch({
                    type: 'todo/updateTodo',
                    payload: {
                        body

                    }
                })
                navigate('/')

            }

        } catch (error) {
            console.error("failed to create task", error);
        }


    }

    useEffect(() => {
        if (!id) return;
        const fetchTodoById = async () => {
            try {
                const token = Cookies.get("token")
                // const body = {
                //     ...detail,
                //     id
                // };
                console.log(id, "here id")
                const res = await axios.post(
                    "http://192.168.1.128/todo/index.php/api/fetchtaskbyid",
                    { id },
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                );
                if (res.data.status) {
                    console.log(res.data.data, "data res")
                    const task = res.data.data[0]
                    setDetail({
                        title: task.title,
                        description: task.description,
                        status: task.status
                    });
                }
            } catch (error) {
                console.error("Failed to update task", error);
            }
        };
        fetchTodoById();
    }, [id]);

    return (
        <div className="dashboard">
            <div className="form-card">
                <h1>FILL YOUR TODO</h1>
                <h2>New Task</h2>
                <div className="form-row">
                    <div className="form-group">
                        <label>Title</label>
                        <input type="text" name='title' value={detail.title} onChange={handleChange} placeholder="Task name..." />
                    </div>
                    <div className="form-group">
                        <label>Description</label>
                        <textarea name='description' value={detail.description} onChange={handleChange} placeholder="Details..." />
                    </div>
                </div>
                <div className="form-actions">
                    {
                        id === null ?
                            <button className="btn-primary" onClick={() => handleAddTodo()}> Add Todo</button>
                            :
                            <button className='btn-primary' onClick={() => handleUpdate()}>Update</button>
                    }
                </div>
            </div>
        </div>
    )
}

export default CreateTodo