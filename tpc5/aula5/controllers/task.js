var axios = require('axios')
//Add task
module.exports.addTask = task =>{
    return axios.post('http://localhost:3000/tareas/',task)
    .then(resposta => {
        return resposta.data
    })
    .catch(erro => {
        return erro
    })
}
//Edit task
module.exports.updateTask = (idTask,newInfo)=>{
    return axios.put('http://localhost:3000/tareas/' + idTask, newInfo)
    .then(resposta => {
        return resposta.data
    })
    .catch(erro => {
        return erro
    })
}
//Move to done
module.exports.doneTask = idTask =>{
    return axios.patch('http://localhost:3000/tareas/' + idTask, {
        "done": "true"})
    .then(resposta => {
        return resposta.data
    })
    .catch(erro => {
        return erro
    })
}
//Delete task
module.exports.deleteTask = idTask =>{
    return axios.delete('http://localhost:3000/tareas/' + idTask)
    .then(resposta => {
        return resposta.data
    })
    .catch(erro => {
        return erro
    })
}

//Tasks list
module.exports.list = () => {
    return axios.get('http://localhost:3000/tareas')
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}

//Get task
module.exports.getTask = id => {
    return axios.get('http://localhost:3000/tareas/' + id)
            .then(resposta => {
                return resposta.data
            })
            .catch(erro => {
                return erro
            })
}
