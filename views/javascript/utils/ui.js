const cardProductEmpty = () => {
    return '<p class="col-12 text-center alert alert-warning"> Achei nada Zé.</p>'
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
    col.classList.add('col')
    col.innerHTML = `<div class="card shadow-sm">
        <img src="${product.image}" class="card-img-top product-img" alt="${product.title}">
        <div class="card-body" >
            <h5 class="card-title">${product.title}</h5>
            <p class="car-text text-truncate" > ${product.description}</p>
            <p class="car-text fw-bold text-success">${product.price.toFixed(2)}</p>
            <div class="d-flex justify-content-between align-items-center mt-auto" >
                <div class="btn-group">
                    <button type="button" class="btn btn-sm" >Detalhes</button>
                    <button type="button"
                        data-id="${product.id}" 
                        data-id-title="${product.title}" 
                        data-id-price="${product.price}" 
                        data-id-image="${product.image}" 
                        class="btn btn-sm btn-success add-to-cart" >
                        + Carrinho
                    </button>
                </div>
                <small class="text-muted">${product.category}</small>
            </div>
        </div>
    </div>`
    return col
}

const buttonCategory = (category) => {
    const button = document.createElement('button')
    button.type = 'button'
    button.className = 'filter-btn list-group-item list-group-item-action'
    button.dataset.category = category
    button.textContent = category.charAt(0).toUpperCase() + category.slice(1)

    return button
}

export { cardProductEmpty, updateStatus, cardProduct, buttonCategory }