import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import './dashboard.css'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Cookies from "js-cookie"
import axios from 'axios'
import TodoCard from '../components/TodoCard'


const Dashboard = () => {

    const dispatch = useDispatch()
    const todos = useSelector((state) => state.todo.todo) || []

    const { authToken, name } = useSelector((state) => state.auth)

    const navigate = useNavigate();

    const handleLogout = () => {
        Cookies.remove("token");
        dispatch({
            type: 'auth/logout'
        })
        navigate('/login')
    }

    const fetchTask = async () => {
        try {
            const token = Cookies.get("token")
            const res = await axios.get(
                "http://192.168.1.128/todo/index.php/api/fetchtask",
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            );
            if (res.data.status) {
                console.log(res.data.data)
                dispatch({
                    type: "todo/fetchTodo",
                    payload: res.data.data
                })
            }
        } catch (error) {
            console.error("failed to create task", error);
        }
    }

    useEffect(() => {
        fetchTask();
    }, [])

    return (

        <div>
            <div className="create-btn-wrapper">
                <button onClick={() => navigate('/createUser')}>Create your To-Do</button>
                <button className="btn-logout" onClick={handleLogout}>Logout</button>
            </div>
            <div className="dashboard-header">
                <h2>My Todos</h2>
                <span className="tag">dashboard</span>
                <span className="tag">{name}</span>
            </div>

            <div className="todo-list-header">
                <h2>Tasks</h2>
                <span className="todo-count">{todos.length}</span>
            </div>

            <div className="todo-list">
                {todos.length === 0 ? (
                    <div className="empty-state">
                        <div className="empty-icon">◻</div>
                        <p>No tasks yet. Add one above.</p>
                    </div>
                ) : (
                    todos.map((todo) => (
                        <TodoCard
                            todo={todo}
                        />
                    ))
                )}
            </div>
        </div>
    )
}

export default Dashboard