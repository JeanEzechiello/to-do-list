const addbutton = document.getElementById('addbutton')
const ipt = document.getElementById('input-tarefa')
const ul = document.getElementById('lista-tarefas')
let tarefas = []

addbutton.addEventListener("click", function() {
    let id = Date.now() + Math.random()
    let txt = ipt.value
    criarTarefa(txt, false, id)

    tarefas.push({texto: txt, concluida: false, id: id})
    localStorage.setItem("trf", JSON.stringify(tarefas))

    ipt.value = ''

});

function criarTarefa(txt, concluida, id) {
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
        tarefas = tarefas.filter(function(t) {
            return t.id !== id
            
        });
        localStorage.setItem("trf", JSON.stringify(tarefas))
    });

    concluido.addEventListener('click', function(){
        texto.classList.toggle('concluida')
        let search = tarefas.find(function(t) {
            return t.id === id
        });
        console.log(search)
        search.concluida = !search.concluida
        localStorage.setItem("trf", JSON.stringify(tarefas))
    });

    editar.addEventListener('click', function(){
        texto.contentEditable = 'true'
        texto.focus()
    });

    if(concluida) {
        texto.classList.add('concluida')
    }
}

let tarefasSalvas = JSON.parse(localStorage.getItem('trf'))

if(tarefasSalvas) {
    tarefasSalvas.forEach(function(item) {
        criarTarefa(item.texto, item.concluida, item.id)
        tarefas.push(item)
    });
}