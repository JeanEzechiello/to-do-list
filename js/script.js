const addbutton = document.getElementById('addbutton')
const ipt = document.getElementById('input-tarefa')
const ul = document.getElementById('lista-tarefas')
let tarefas = []
let newtrf = null

addbutton.addEventListener("click", function() {
    
    let txt = ipt.value

    if(txt.trim() == '') {
        return
    }
    let id = Date.now() + Math.random()
    criarTarefa(txt, false, id)

    tarefas.push({texto: txt, concluida: false, id: id})
    localStorage.setItem("trf", JSON.stringify(tarefas))

    ipt.value = ''

    verificarListaVazia()
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
        remove.classList.add('btn-excluir')
        if(confirm('Tem certeza que quer excluir?')) {
            novatarefa.remove()
        tarefas = tarefas.filter(function(t) {
            return t.id !== id
            
        });
        localStorage.setItem("trf", JSON.stringify(tarefas))
         verificarListaVazia()
        }else {
            return
        }
        
    });
   

    concluido.addEventListener('click', function(){
        concluido.classList.add('btn-concluir')
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
verificarListaVazia()

function verificarListaVazia() {
    if(ul.children.length === 0) {
       newtrf = document.createElement('li')
       newtrf.innerText = 'Nenhuma tarefa ainda'
       ul.appendChild(newtrf)
    } else {
        newtrf.remove()
    }
}