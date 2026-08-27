const addbutton = document.getElementById('addbutton')
const ipt = document.getElementById('input-tarefa')
const ul = document.getElementById('lista-tarefas')

addbutton.addEventListener("click", function() {
    let txt = ipt.value

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

    ipt.value = ''

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
});