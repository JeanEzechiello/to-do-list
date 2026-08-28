const addbutton = document.getElementById('addbutton')
const ipt = document.getElementById('input-tarefa')
const ul = document.getElementById('lista-tarefas')
let tarefas = []

addbutton.addEventListener("click", function() {
    let txt = ipt.value
    criarTarefa(txt)

    tarefas.push({texto: txt, concluida: false})
    localStorage.setItem("trf", JSON.stringify(tarefas))

    ipt.value = ''

});

function criarTarefa(txt) {
    let novatarefa = document.createElement('li')
    let texto = document.createElement('span')
    let remove = document.createElement('button')
    let concluido = document.createElement('button')
    let editar = document.createElement('button')
    
    texto.innerText = txt
    remove.innerText = "Excluir"
    concluido.innerText = "✓"
    editar.innerText = '✏️'

    novatarefa.appendChild(texto)
    novatarefa.appendChild(concluido)
    novatarefa.appendChild(editar)
    novatarefa.appendChild(remove)
    ul.appendChild(novatarefa)

    remove.addEventListener('click', function(){
        novatarefa.remove()
    });

    concluido.addEventListener('click', function(){
        texto.classList.add('concluida')
    });

    editar.addEventListener('click', function(){
        texto.contentEditable = 'true'
        texto.focus()
    });

}

let tarefasSalvas = JSON.parse(localStorage.getItem('trf'))

if(tarefasSalvas) {
    tarefasSalvas.forEach(function(item) {
        criarTarefa(item.texto)
    });
}