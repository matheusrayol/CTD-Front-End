// Captura os elementos necessários para o funcionamento do script
// Lista de cards
const capturaElementoPai = document.getElementById("lista-cards");
// Botão para adicionar card
const adicionarCard = document.getElementById("btAdicionar");
// Botão para fechar o modal
const fecharModal = document.getElementById("toggleMyModal")

// Função para inserção de novos cards
function inserirNovoCard() {

    // Variáveis dos campos de cadastro
    var inJogo = document.getElementById("inJogo").value;
    var inPlataforma = document.getElementById("inPlataforma").value;
    var inImagem = document.getElementById("inImagem").value;
    var inDescricao = document.getElementById("inDescricao").value;

    // validar o preenchimento dos campos
    if (inJogo == "" || inPlataforma == "" || inDescricao == "" || inImagem == "") {
      alert("Informe os dados corretamente!");
      inJogo.focus();
      return;
    }

    // Criação de um objeto com os dados das variáveis
    var infoCards = {
        jogo: inJogo,
        plataforma: inPlataforma,
        imagem: inImagem,
        descricao: inDescricao
    }

    // Inserção dos dados do objeto na página com manipulação do DOM
    const card = `<div class="card bg-dark gamegeek-card border-0 h-100">
        <img class="card-img-top" src="${infoCards.imagem}" alt="${infoCards.jogo}">
        <div class="card-body d-flex flex-column">
            <h4 class="card-title font-face-gamegeek text-white">${infoCards.jogo}</h4>
            <h6 class="card-subtitle text-muted mb-2">${infoCards.plataforma}</h6>
            <p class="card-text mb-auto text-white">${infoCards.descricao}</p>
        </div>
        <div class="card-footer border-0 mb-2">
        </div>
    </div>`

    // Inserção do card na página
    let novoCard = document.createElement("div");
    novoCard.setAttribute('id', "card");
    novoCard.setAttribute('class', "col-sm-12 col-md-7 col-lg-6 col-xl-5 col-xxl-4")

    novoCard.innerHTML = card;
    capturaElementoPai.appendChild(novoCard);

    // Limpar os campos
    document.getElementById("inJogo").value = "";
    document.getElementById("inPlataforma").value = "";
    document.getElementById("inImagem").value = "";
    document.getElementById("inDescricao").value = "";
}

// Listener para adição dos cards
adicionarCard.addEventListener("click", function(evento) {
    evento.preventDefault();
    inserirNovoCard();
    fecharModal.click();
});