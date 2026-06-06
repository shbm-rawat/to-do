import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    todo: []
};

const todoSlice = createSlice({
    name: "todo",
    initialState: initialState,
    reducers: {

        fetchTodo: (state, action) => {
            state.todo = action.payload
        },

        createTodo: (state, action) => {
            state.todo.push(action.payload)
        },

        updateTodoStatus: (state, action) => {
            const index = state.todo.findIndex((t) => t.id === action.payload.id)
            if (index !== -1) {
                state.todo[index] = action.payload
            }
        },

        updateTodo: (state, action) => {
            const index = state.todo.findIndex((t) => t.id === action.payload.id);

            if (index !== -1) {
                state[index] = {
                    ...state[index],
                    title: action.payload.title,
                    description: action.payload.description,
                    status: action.payload.status
                };
            }
        },

        deleteTodo: (state, action) => {

            const index = state.todo.findIndex(t => {

                return t.id === action.payload.id
            })

            if (index !== -1) {
                state.todo.splice(index, 1)
            }
        }


    }
});

export const { createTodo, updateTodoStatus, deleteTodo, fetchTodo, updateTodo } = todoSlice.actions;

export default todoSlice.reducer;