var express = require('express');
var router = express.Router();
var task = require('../controllers/task')
tareasFinished = []
tareasNotFinished = []
/* GET home page. */
router.get('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  task.list()
    .then(tareas => {
      tareasFinished = []
      tareasNotFinished = []
      for(let i=0; i < tareas.length ; i++){
        if(tareas[i].done == "true")
        {
            tareasFinished.push(tareas[i])
        }
        else{
            tareasNotFinished.push(tareas[i])
        }
      }
      console.log(tareasFinished)
      console.log(tareasNotFinished)
      res.render('index', { finishedList: tareasFinished,notFinishedList: tareasNotFinished,task:null, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Error while retrieving the task lists"})
    })
});

/* GET Edit page. */
router.get('/tareas/edit/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  task.getTask(req.params.idTask)
    .then(taskUpdate => {
      res.render('index', { finishedList: tareasFinished, notFinishedList:tareasNotFinished, task:taskUpdate, d: data });
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Error while retrieving the info of the task"})
    })
});

/* GET delete task. */
router.get('/tareas/delete/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  task.deleteTask(req.params.idTask)
    .then(task => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Error while deleting the task"})
    })
});

/* GET done task. */
router.get('/tareas/done/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  task.doneTask(req.params.idTask)
    .then(task => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Error while moving to done list"})
    })
});

router.post('/tareas/edit/:idTask', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  task.updateTask(req.params.idTask,req.body)
    .then(task => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Error while updating the task"})
    })
});

router.post('/', function(req, res, next) {
  var data = new Date().toISOString().substring(0, 16)
  task.addTask(req.body)
    .then(task => {
      res.redirect('/')
    })
    .catch(erro => {
      res.render('error', {error: erro, message: "Error while updating the task"})
    })
});
module.exports = router;
