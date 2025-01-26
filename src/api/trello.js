import axios from 'axios';




export const getallTasks = () => {
    return axios.get('https://back-end-trello-production.up.railway.app/trello/api/v1/tareas/')
}

export const updateStateTask = (id, stateUpdate) => {
    return axios.patch(`https://back-end-trello-production.up.railway.app/trello/api/v1/tareas/${id}/`, { status: stateUpdate })
}

export const addTask = (task) => {
    return axios.post('https://back-end-trello-production.up.railway.app/trello/api/v1/tareas/', task)
}

export const getAllProyect = () => {
    return axios.get('https://back-end-trello-production.up.railway.app/trello/api/v1/tableros/')

}
export const addTablero = (tablero) => {
    return axios.post('https://back-end-trello-production.up.railway.app/trello/api/v1/tableros/', tablero)
}
export const deleteTask = (id) => {
    return axios.delete(`https://back-end-trello-production.up.railway.app/trello/api/v1/tareas/${id}/`)
}

export const deleteTablero = (id) => {
    return axios.delete(`https://back-end-trello-production.up.railway.app/trello/api/v1/tableros/${id}/`)
}
export const getUser = () => {
    return axios.get('https://back-end-trello-production.up.railway.app/trello/api/v1/user/')
}
export const addUser = (user) => {
    return axios.post('https://back-end-trello-production.up.railway.app/trello/api/v1/user/', user)
}
