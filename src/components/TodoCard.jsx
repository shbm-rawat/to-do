import React, { useState } from 'react'
import { MdEdit } from 'react-icons/md'
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios';

const TodoCard = ({ todo }) => {
    const [status, setStatus] = useState('pending')
    const navigate = useNavigate();
    const dispatch = useDispatch()

    const handleUpdateStatus = async (id, status) => {
        try {

            let body = {
                ...todo,
                status: status,
                id: id
            }

            const token = Cookies.get("token");
            const res = await axios.put(
                "http://192.168.1.128/todo/index.php/api/updatetask",
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            if (res.data.status) {
                dispatch({
                    type: 'todo/updateTodoStatus',
                    payload: {
                        ...todo,
                        id: id,
                        status: status
                    }
                })
            }
        }
        catch (error) {
            console.error("failed to delete task", error);
        }
    }

    const handleDel = async (id) => {

        try {
            const token = Cookies.get("token");
            const res = await axios.delete(
                "http://192.168.1.128/todo/index.php/api/dlttask", {

                headers: { Authorization: `Bearer ${token}` },
                params: { id }
            }
            );
            if (res.data.id) {
                dispatch({
                    type: 'todo/deleteTodo',
                    payload: {
                        id
                    }
                })
            }

        } catch (error) {
            console.error("failed to delete task", error);
        }

    }

    const handleUpdate = (id) => {
        navigate(`/createUser?id=${id}`)
    }

    return (
        <div key={todo.id} className="todo-item">
            <div className="todo-body">
                <div className="todo-title">{todo.title}</div>
                <div className="todo-description">{todo.description}</div>
                <div className="todo-meta">
                    <span className={`status-badge ${todo.status}`}>{todo.status}</span>
                </div>
                <select
                    value={todo.status}
                    onChange={(e) => handleUpdateStatus(todo.id, e.target.value)}
                >
                    <option value="completed">Completed</option>
                    <option value="pending">Pending</option>
                    <option value="rejected">Rejected</option>
                </select>
            </div>
            <div className="todo-actions">
                <button className='btn-danger ' onClick={() => handleUpdate(todo.id)}  >  <MdEdit /> Edit</button>
                <button className="btn-danger" onClick={() => handleDel(todo.id)}>Delete</button>

            </div>
        </div>
    )
}

export default TodoCard