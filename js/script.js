const addbutton = document.getElementById('addbutton')
const ipt = document.getElementById('input-tarefa')
const ul = document.getElementById('lista-tarefas')

addbutton.addEventListener("click", function() {
    let txt = ipt.value
    console.log(txt)

let novatarefa = document.createElement('li')
let remove = document.createElement('button')
let concluido = document.createElement('button')

novatarefa.innerText = txt
remove.innerText = "Excluir"

novatarefa.appendChild(remove)
ul.appendChild(novatarefa)

concluido.innerText = "✓"
novatarefa.appendChild(concluido)

ipt.value = ''

remove.addEventListener('click', function(){
    novatarefa.remove()
});

concluido.addEventListener('click', function(){
    novatarefa.classList.add('concluida')
});

});
