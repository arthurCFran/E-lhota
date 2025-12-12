const cardCartProduct = (product) => {
    const col = document.createElement('div')
    col.classList.add('col')
    col.innerHTML = `
        <div class="card shadow-sm bg-light p-3 cart-card">
            <div class="d-flex align-items-center">
                <img src="${product.image}" class="cart-img me-3">
                <div class="flex-grow-1">
                    <h6>${product.title}</h6>
                    <p class="fw-bold text-success">R$ ${product.price.toFixed(2)}</p>
                </div>
                <button class="btn btn-sm btn-danger remove-from-cart"
                    data-id="${product.id}">
                    X
                </button>
            </div>
        </div>
    `
    return col
}
export {cardCartProduct}