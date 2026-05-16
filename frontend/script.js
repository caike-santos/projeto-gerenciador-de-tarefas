const apiURL = 'http://localhost:3000/tarefas';

// Função para buscar tarefas do Back-end e mostrar na tela
async function carregarTarefas() {
    const response = await fetch(apiURL);
    const tarefas = await response.json();
    
    const lista = document.getElementById('listaTarefas');
    lista.innerHTML = ''; // Limpa a lista antes de mostrar

    tarefas.forEach(t => {
        const li = document.createElement('li');
        li.innerHTML = `
            ${t.descricao} 
            <button onclick="deletarTarefa(${t.id})">❌</button>
        `;
        lista.appendChild(li);
    });
}

// Função para enviar uma nova tarefa para o Back-end
async function adicionarTarefa() {
    const input = document.getElementById('tarefaInput');
    const novaTarefa = { descricao: input.value };

    await fetch(apiURL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novaTarefa)
    });

    input.value = '';
    carregarTarefas(); // Atualiza a lista
}

// Chamar ao carregar a página
carregarTarefas();

async function deletarTarefa(id) {
    if (confirm("Deseja mesmo excluir esta tarefa?")) {
        await fetch(`${apiURL}/${id}`, {
            method: 'DELETE'
        });
        carregarTarefas(); // Recarrega a lista após deletar
    }
}