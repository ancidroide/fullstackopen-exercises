import axios from "axios";
const baseUrl = '/api/persons'

// obtain (GET) all persons from db.json --> axios.get(url)
const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
}

// create (POST) newPerson --> axios.post(url, obj)
const create = newObject => {
    const request = axios.post(baseUrl, newObject)
    return request.then(response => response.data)
}


// update (PUT) existing person (ex. 2.15) --> axios.put(url, obj)
const update = (id, newObject) => {
    const request = axios.put(`${baseUrl}/${id}`, newObject)
    return request.then(response => response.data)
}


// delete (DELETE) existing person (ex. 2.14) --> axios.delete(url, obj)
const deletePerson = (id) => {
    const request = axios.delete(`${baseUrl}/${id}`)
    return request.then(response => response.data)
}

export default { getAll, create, update, deletePerson }