function adicionarCarrinho(nome, preco, img = '', ingredientes = '') {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.push({ nome, preco, img, ingredientes });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
    alert(nome + " adicionado ao carrinho!");
}

function atualizarCarrinho() {
    const divCarrinho = document.getElementById("carrinho");
    if (!divCarrinho) return;

    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    divCarrinho.innerHTML = "";

    let total = 0;
    carrinho.forEach((item, index) => {
        divCarrinho.innerHTML += `
            <div class="carrinho-item">
                ${item.img ? `<img src="${item.img}" width="50" height="50" alt="${item.nome}">` : ''}
                <div>
                    <p><strong>${item.nome}</strong></p>
                    <p>Preço: R$ ${item.preco.toFixed(2)}</p>
                    ${item.ingredientes ? `<p>Ingredientes: ${item.ingredientes}</p>` : ''}
                    <button onclick="removerCarrinho(${index})">Remover</button>
                </div>
            </div>
        `;
        total += item.preco;
    });

    if (carrinho.length > 0) {
        divCarrinho.innerHTML += `<h3>Total: R$ ${total.toFixed(2)}</h3>`;
    } else {
        divCarrinho.innerHTML = "<p>Carrinho vazio</p>";
    }
}

function removerCarrinho(index) {
    let carrinho = JSON.parse(localStorage.getItem('carrinho')) || [];
    carrinho.splice(index, 1);
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
    atualizarCarrinho();
}

function limparCarrinho() {
    localStorage.removeItem('carrinho');
    atualizarCarrinho();
}

window.onload = atualizarCarrinho;
