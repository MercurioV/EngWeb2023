exports.mainPage = function(tarea, tareas, d ){
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
    pagHTML = `
    <html>
    <head>
    <title>W3.CSS Template</title>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <link rel="stylesheet" href="https://www.w3schools.com/w3css/4/w3.css">
    </head>
    <body class="w3-content" style="max-width:1300px">
    
    <!-- First Grid: Logo & About -->
    <!-- First Grid: Logo & About -->
      <div class="w3-row">
        <div class="w3-black w3-container w3-center" style="height:650px">
          <div class="w3-padding-64">
            <h1>Add Task</h1>
          </div>
              <form class="w3-container" method="POST">
                <fieldset>`
                if(tarea!=null)
                {
                    pagHTML+=`
                    <legend>Task Data</legend>
                    <label>Id</label>
                    <input class="w3-input w3-round" type="text" name="id" readonly value="${tarea.id}"/>
                    <label>Task description</label>
                    <input class="w3-input w3-round" type="text" name="what" value="${tarea.what}"/>
                    <label>Who has to do it</label>
                    <input class="w3-input w3-round" type="text" name="who" value="${tarea.who}"/>
                    <label>Due date</label>
                    <input class="w3-input w3-round" type="text" name="when" value="${tarea.when}"/>
                    <label>Is it done?</label>
                    <input class="w3-input w3-round" type="text" name="done" value="${tarea.done}"/>
                    `
                }
                else{
                    pagHTML+=`
                    <legend>Task Data</legend>
                     <label>Id</label>
                     <input class="w3-input w3-round" type="text" name="id"/>
                     <label>Task description</label>
                     <input class="w3-input w3-round" type="text" name="what"/>
                     <label>Who has to do it</label>
                     <input class="w3-input w3-round" type="text" name="who"/>
                     <label>Due date</label>
                     <input class="w3-input w3-round" type="text" name="when"/>
                     <label>Is it done?</label>
                     <input class="w3-input w3-round" type="text" name="done"/>
                    `
                }
               pagHTML+=`</fieldset>
               <br/>
                <button class="w3-btn w3-round w3-grey" type="submit">Register</button>
          </form>
        </div>
      </div>
    
    <!-- Third Grid: Swing By & Contact -->
    <div class="w3-row" id="contact">
        <!-- List of toDo -->
      <div class="w3-half w3-container w3-center" style="height:700px">
        <div class="w3-padding-64 w3-padding-large">
          <h1>To do list</h1>
        </div>
          <div class="w3-container">
       <table class="w3-table-all">
         <tr>
          <th>Description</th><th>Who</th><th>DueDate</th>
         </tr>`
    for(let i=0;i<tareasNotFinished.length;i++)
    {
        pagHTML+=`
                <tr>
                    <td>${tareasNotFinished[i].what}</td>
                    <td>${tareasNotFinished[i].who}</td>
                    <td>${tareasNotFinished[i].when}</td>
                    <td>
                    [<a href="/tareas/edit/${tareasNotFinished[i].id}">Edit</a>][<a href="/tareas/delete/${tareasNotFinished[i].id}">Delete</a>]
                    </td>
                    <td>
                        <a href="/tareas/done/${tareasNotFinished[i].id}" class="w3-btn w3-round w3-grey">Done</a>
                    </td>
            </tr>
        `
    }
    pagHTML+=`     
       </table>
    </div>
      </div>
      <!-- List of done -->
      <div class="w3-half w3-container" style="height:700px">
        <div class="w3-padding-64 w3-padding-large">
          <h1>List of Done tasks</h1>
        </div>
          <div class="w3-container">
       <table class="w3-table-all">
         <tr>
          <th>Description</th><th>Who</th><th>DueDate</th>
         </tr>`
         for(let i=0;i<tareasFinished.length;i++)
         {
            pagHTML+=`
                <tr>
                    <td>${tareasFinished[i].what}</td>
                    <td>${tareasFinished[i].who}</td>
                    <td>${tareasFinished[i].when}</td>
                    <td>
                    [<a href="/tareas/edit/${tareasFinished[i].id}">Edit</a>][<a href="/tareas/delete/${tareasFinished[i].id}">Delete</a>]
                    </td>
            </tr>
        `
        }
    pagHTML+=`   </table>
    </div>
        </div>
      </div>
    </div>
    
    <!-- Footer -->
    <footer class="w3-container w3-black w3-padding-16">
      <p>Powered by <a href="https://www.w3schools.com/w3css/default.asp" target="_blank">w3.css</a></p>
    </footer>
    
    </body>
    </html>
    `
    return pagHTML
}
// -------------- Error Treatment ------------------------------
exports.errorPage = function(errorMessage, d){
    return `
    <p>${d}: Error: ${errorMessage}</p>
    `
}