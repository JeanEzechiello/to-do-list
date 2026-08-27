const addbutton = document.getElementById('addbutton')
const ipt = document.getElementById('input-tarefa')
const ul = document.getElementById('lista-tarefas')

addbutton.addEventListener("click", function() {
    let txt = ipt.value
    console.log(txt)

let novatarefa = document.createElement('li')
let remove = document.createElement('button')

novatarefa.innerText = txt
remove.innerText = "Excluir"
novatarefa.appendChild(remove)
ul.appendChild(novatarefa)

ipt.value = ''
});
