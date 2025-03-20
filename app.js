document.addEventListener('DOMContentLoaded', () => {
    const inputAmigo = document.getElementById('amigo');
    const listaAmigos = document.getElementById('listaAmigos');
    const resultado = document.getElementById('resultado');
    let amigos = [];

    // Função de navegação entre telas
    window.navigateToScreen = (screenIndex) => {
        const wrapper = document.querySelector('.screens-wrapper');
        wrapper.style.transform = `translateX(-${screenIndex * 33.333}%)`;
    };

    window.adicionarAmigo = () => {
        const nomeAmigo = inputAmigo.value.trim();

        if (nomeAmigo === "") {
            alert("Por favor, insira um nome válido.");
            return;
        }

        amigos.push(nomeAmigo);
        atualizarListaAmigos();
        inputAmigo.value = "";
        inputAmigo.focus();
    };

    const atualizarListaAmigos = () => {
        listaAmigos.innerHTML = "";
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

        navigateToScreen(2); // Navega para a tela de resultado (com contagem regressiva)

        const indiceAleatorio = Math.floor(Math.random() * amigos.length);
        const amigoSorteado = amigos[indiceAleatorio];

        startCountdown(() => {
            resultado.innerHTML = `
                <li class="result-text">O amigo secreto sorteado foi:</li>
                <li class="result-name">${amigoSorteado}</li>
            `;
        });
    };

    const startCountdown = (callback) => {
        const countdownElement = document.createElement('div');
        countdownElement.classList.add('countdown');
        resultado.innerHTML = ''; // Clear previous results
        resultado.appendChild(countdownElement);

        let count = 3;
        countdownElement.textContent = count;

        const interval = setInterval(() => {
            count--;
            if (count > 0) {
                countdownElement.textContent = count;
            } else {
                clearInterval(interval);
                resultado.removeChild(countdownElement); // Remove countdown element
                callback(); // Show the result
            }
        }, 1000);
    };

    // Adiciona funcionalidade de adicionar amigo ao pressionar Enter
    inputAmigo.addEventListener("keyup", function(event) {
        if (event.key === "Enter") {
            event.preventDefault();
            adicionarAmigo();
        }
    });

    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Check saved theme or system preference
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const savedTheme = localStorage.getItem('theme') || (prefersDark ? 'dark' : 'light');
    html.setAttribute('data-theme', savedTheme);

    // Update theme toggle
    themeToggle.addEventListener('click', () => {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        html.setAttribute('data-theme', newTheme);
        localStorage.setItem('theme', newTheme);
        
        // Add animation effect
        themeToggle.style.transform = 'rotate(360deg)';
        setTimeout(() => {
            themeToggle.style.transform = 'none';
        }, 300);
    });
});