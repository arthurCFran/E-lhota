import * as cart from './module/cart/cart.js'
import * as ui from './utils/ui.js'

(() => {
    "use strict"

    const KEY = 'carrinho-digital'

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

    const showCarrinho = async () => {
        
        const products = await cart.get()

        console.log(products)

        if (products.length === 0) {
            productList.innerHTML = ui.cardProductEmpty()
            return
        }

        ui.updateStatus('', 'none')
        renderCart(products)
    }
    const renderCart = (products) => {
        const productList = document.querySelector("#product-list")
        productList.innerHTML = ''
        products.forEach(product => {
            const col = ui.cardProduct(product)
            const modal = ui.modalButton(product);
            productList.appendChild(col)
            document.body.appendChild(modal); 
        })
    }
    
    showCarrinho()
})()