document.addEventListener('DOMContentLoaded', () => {
    const cardContainer = document.querySelector('.card-container');
    const searchSelect = document.querySelector('#search-select');
    const aside = document.querySelector('#aside2');

    fetch('data.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok ' + response.statusText);
            }
            return response.json();
        })
        .then(data => {
            // Adiciona a opção "Todos os membros"
            const allMembersOption = document.createElement('option');
            allMembersOption.value = "todos";
            allMembersOption.textContent = "Todos os membros";
            searchSelect.appendChild(allMembersOption);

            // Popula o dropdown com todos os nomes
            data.forEach(item => {
                const option = document.createElement('option');
                option.value = item.nome;
                option.textContent = item.nome;
                searchSelect.appendChild(option);
            });

            // Exibe a descrição "Oque é a N13?" ao carregar a página
            const homeInfo = data.find(item => item.nome === "Oque é a N13?");
            if (homeInfo) {
                displayInfo(homeInfo);
                searchSelect.value = homeInfo.nome; // Define o valor inicial do select
            }

            // Adiciona o evento de mudança no select
            searchSelect.addEventListener('change', (event) => {
                const selectedName = event.target.value;

                if (selectedName === "todos") {
                    displayAllMembers(data);
                } else {
                    const selectedItem = data.find(item => item.nome === selectedName);
                    if (selectedItem) {
                        displayInfo(selectedItem);
                    }
                }
            });
        })
        .catch(error => {
            console.error('Houve um problema com a operação de fetch:', error);
            cardContainer.innerHTML = '<p>Não foi possível carregar os dados. Tente novamente mais tarde.</p>';
        });

    function displayAllMembers(data) {
        cardContainer.innerHTML = ''; // Limpa o conteúdo anterior
        cardContainer.classList.remove('individual-view'); // Remove a classe de visualização individual
        aside.style.display = 'none'; // Esconde o aside ao mostrar todos os membros
        const members = data.filter(item => item.nome !== "Oque é a N13?");

        members.forEach(item => {
            const card = document.createElement('div');
            card.className = 'card';

            let content = `<h2>${item.nome}</h2><p>${item.descricao}</p>`;

            if (item.imagem) {
                content += `<img src="${item.imagem}" alt="Imagem de ${item.nome}">`;
            }

            card.innerHTML = content;
            cardContainer.appendChild(card);
        });
    }

    function displayInfo(item) {
        cardContainer.innerHTML = ''; // Limpa o conteúdo anterior
        cardContainer.classList.add('individual-view'); // Adiciona a classe para centralizar

        const card = document.createElement('div');
        card.className = 'card';

        // Adiciona uma classe especial se for o card "Oque é a N13?"
        if (item.nome === "Oque é a N13?") {        
            card.classList.add('card-home');
            aside.style.display = 'block'; // Mostra o aside
        }
        else { aside.style.display = 'none';} // Esconde o aside para outras opções

        let content = `<h2>${item.nome}</h2><p>${item.descricao}</p>`;

        if (item.imagem) {
            content += `<img src="${item.imagem}" alt="Imagem de ${item.nome}">`;
        }

        card.innerHTML = content;
        cardContainer.appendChild(card);
    }
});