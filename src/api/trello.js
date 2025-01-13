import axios from 'axios';




export const getallTasks = () => {
    return axios.get('https://back-end-trello.onrender/trello/api/v1/tareas/')
}

export const updateStateTask = (id, stateUpdate) => {
    return axios.patch(`http://localhost:8000/trello/api/v1/tareas/${id}/`, { status: stateUpdate })
}

export const addTask = (task) => {
    return axios.post('http://localhost:8000/trello/api/v1/tareas/', task)
}

export const getAllProyect = () => {
    return axios.get('http://localhost:8000/trello/api/v1/tableros/')

}
export const addTablero = (tablero) => {
    return axios.post('http://localhost:8000/trello/api/v1/tableros/', tablero)
}
export const deleteTask = (id) => {
    return axios.delete(`http://localhost:8000/trello/api/v1/tareas/${id}/`)
}

export const deleteTablero = (id) =>{
    return axios.delete(`http://localhost:8000/trello/api/v1/tableros/${id}/`)
}
