const cardCartProduct = (product) => {
    const col = document.createElement('div')
    col.classList.add('col')
    col.innerHTML = `
            <div class="card shadow-sm text-light  ">
        <img src="${product.image}" class="card-img-top product-img" alt="${product.title}">
        <div class="card-body" >
            <h5 class="card-title">${product.title}</h5>
            <p class="car-text text-truncate" > ${product.description}</p>
            <p class="car-text fw-bold text-success">R$${product.price.toFixed(2)}</p>
            <p class="car-text fw-bold text-light">Quantidade: ${product.quantityReq}</p>
            <div class="d-flex justify-content-between align-items-center mt-auto" >
                <button type="button"
                    data-product='${JSON.stringify(product).replace(/'/g, "&apos;")}'
                    class="btn btn-sm btn-danger exclude-from-cart" >
                    - 1
                </button>
            </div>
        </div>
    </div>
    `
    return col
}
export { cardCartProduct }