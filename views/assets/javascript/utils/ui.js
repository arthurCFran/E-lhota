const cardProductEmpty = () => {
    return '<p class="col-12 text-center alert alert-warning"> Nenhum produto encontrado.</p>'
}

const updateStatus = (text, type) => {
    const statusMessage = document.querySelector('#status-message')
    if (type === 'none') {
        statusMessage.classList.add('d-none')
    } else {
        statusMessage.textContent = text
        statusMessage.className = ` alert alert-${type} text-center`
        statusMessage.classList.remove('d-none')
    }
}

const cardProduct = (product) => {
    const col = document.createElement('div')
    const modalId = `modal-${product.id}`;
    col.classList.add('col')
    col.innerHTML = `<div class="card shadow-sm">
        <img src="${product.image}" class="card-img-top product-img" alt="${product.title}">
        <div class="card-body" >
            <h5 class="card-title">${product.title}</h5>
            <p class="car-text text-truncate" > ${product.description}</p>
            <p class="car-text fw-bold text-success">R$${product.price.toFixed(2)}</p>
            <div class="d-flex justify-content-between align-items-center mt-auto" >
                <div class="btn-group">
                    <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#${modalId}">
                       + Detalhes
                    </button>
                    <button type="button"
                        data-product='${JSON.stringify(product).replace(/'/g, "&apos;")}'
                        class="btn btn-sm btn-success add-to-cart" >
                        + Carrinho
                    </button>
                </div>
                <small class="text-muted">${product}</small>
            </div>
        </div>
    </div>`
    return col
}

const modalButton = (product) => {
    const modalId = `modal-${product.id}`;

    const card = document.createElement('div');
    card.classList.add('card');

    card.innerHTML = `

        <div class="modal fade" id="${modalId}" tabindex="-1" role="dialog" aria-labelledby="${modalId}-title" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                
                    <div class="modal-header">
                        <h5 class="modal-title" id="${modalId}-title">${product.title}</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>

                    <div class="modal-body">
                        <img src="${product.image}" class="img-fluid mb-3" alt="${product.title}">
                        <p><strong>Preço:</strong> R$ ${product.price.toFixed(2)}</p>
                        <p><strong>Descrição:</strong> ${product.description || "Sem descrição disponível"}</p>
                        <p><strong>Categoria:</strong> ${product}</p>
                        <p><strong>Quantidade em estoque:</strong> ${product.quantity || "Sem estoque disponível"}</p>
                        <p><strong>Avaliação:</strong> ${product.rating ? product.rating.rate : "N/A"} (${product.rating ? product.rating.count : "0"} avaliações)</p>
                    </div>

                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-dismiss="modal">Fechar</button>

                        <button type="button"
                            data-id="${product.id}" 
                            data-title="${product.title}" 
                            data-price="${product.price.toFixed(2)}" 
                            data-image="${product.image}"
                            class="btn btn-success add-to-cart">
                            + Carrinho
                        </button>
                    </div>

                </div>
            </div>
        </div>
    `;

    return card;
};

const buttonCategory = (category) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'filter-btn list-group-item list-group-item-action'
    button.dataset.category = category
    button.textContent = category.charAt(0).toUpperCase() + category.slice(1)

    return button
}

export { cardProductEmpty, updateStatus, cardProduct, buttonCategory, modalButton }