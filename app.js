document.addEventListener('DOMContentLoaded', () => {
    const inputAmigo = document.getElementById('amigo');
    const listaAmigos = document.getElementById('listaAmigos');
    const resultado = document.getElementById('resultado');
    let amigos = [];

    window.adicionarAmigo = () => {
        const nomeAmigo = inputAmigo.value.trim();

        if (nomeAmigo === "") {
            alert("Por favor, insira um nome válido.");
            return;
        }

        amigos.push(nomeAmigo);
        atualizarListaAmigos();
        inputAmigo.value = ""; // Limpa o campo de texto
        inputAmigo.focus(); // Devolve o foco para o input
    };

    const atualizarListaAmigos = () => {
        listaAmigos.innerHTML = ""; // Limpa a lista antes de atualizar
        amigos.forEach(amigo => {
            const listItem = document.createElement('li');
            listItem.textContent = amigo;
            listaAmigos.appendChild(listItem);
        });
    };

    window.sortearAmigo = () => {
        if (amigos.length < 2) {
            alert("Adicione pelo menos dois amigos para realizar o sorteio.");
            return;
        }

        const indiceAleatorio = Math.floor(Math.random() * amigos.length);
        const amigoSorteado = amigos[indiceAleatorio];

        resultado.innerHTML = `<li>O amigo secreto sorteado foi: ${amigoSorteado}</li>`;
    };

    // Adiciona funcionalidade de adicionar amigo ao pressionar Enter no campo de input
    inputAmigo.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            document.querySelector(".button-add").click();
        }
    });
});