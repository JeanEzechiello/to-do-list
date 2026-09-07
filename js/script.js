const addbutton = document.getElementById('addbutton')
const ipt = document.getElementById('input-tarefa')
const ul = document.getElementById('lista-tarefas')
const botaoLimpar = document.getElementById('limpartudo')
const contador = document.getElementById('contador')
let tarefas = []
let newtrf = null

function adicionarTarefa() {
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
    atualizarContador()
}

ipt.addEventListener("keydown", function(evento) {
    if(evento.key === 'Enter') {
          adicionarTarefa()
     }
   
});

addbutton.addEventListener('click', function() {
    adicionarTarefa()
})

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

            novatarefa.remove()
        tarefas = tarefas.filter(function(t) {
            return t.id !== id
            
        });
        localStorage.setItem("trf", JSON.stringify(tarefas))
         verificarListaVazia()
         atualizarContador()
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
        atualizarContador()
    });

    editar.addEventListener('click', function(){
        texto.contentEditable = 'true'
        texto.focus()
        texto.addEventListener('keydown', function(event) {
            if(event.key === 'Enter') {
                event.preventDefault()
                texto.contentEditable = 'false'
            }
        }) ;
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
        if(newtrf) {
            newtrf.remove()
        }
        
    }
}

function atualizarContador() {
    let res = tarefas.filter(function(t) {
        return t.concluida
    })

    contador.innerHTML = `${res.length} de ${tarefas.length} concluídas`
}

function limparTudo() {
    ul.innerHTML = ''
    tarefas = []
    localStorage.clear()

    verificarListaVazia()
    atualizarContador()
}

botaoLimpar.addEventListener('click', function() {
    limparTudo()
})

atualizarContador()