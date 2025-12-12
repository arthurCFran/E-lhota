import * as cart from './module/cart/cart.js'
import * as ui from './utils/ui/ui.js'

(() => {
    "use strict"

    const KEY = 'carrinho-digital'
    const productList = document.querySelector("#product-list")
    const cartPrice = document.querySelector("#total-price")
    const cartItems = document.querySelector("#total-items")
    const btnCheckout = document.querySelector("#checkout-button")
    let checkoutModal = {
        totalPrice: 0,
        totalItems: 0
    }

    const showCarrinho = async () => {
        checkoutModal = {}
        checkoutModal.totalPrice = 0
        checkoutModal.totalItems = 0

        productList.innerHTML = ''
        const products = await cart.get()

        if (products.length === 0) {
            productList.innerHTML = ui.cardProductEmpty()
            return
        }

        ui.updateStatus('', 'none')
        renderCart(products)

        cartPrice.textContent = `R$ ${checkoutModal.totalPrice.toFixed(2)}`
        cartItems.textContent = `${checkoutModal.totalItems} item(s)`
        btnCheckout.dataset.checkout = JSONstringify(checkoutModal)
    }
    const renderCart = (products) => {
        const productList = document.querySelector("#product-list")
        productList.innerHTML = ''
        products.forEach(product => {
            const col = ui.cardCartProduct(product)
            const modal = ui.modalButton(product);
            productList.appendChild(col)
            document.body.appendChild(modal);

            checkoutModal.totalPrice += product.price * product.quantityReq
            checkoutModal.totalItems += product.quantityReq

            checkoutModal[product.id] = {
                id: product.id,
                title: product.title,
                price: product.price,
                description: product.description,
                category: product.category,
                image: product.image,
                quantity: product.quantityReq
            }
        })
    }

    productList.addEventListener('click', async (event) => {
        if (!event.target.classList.contains('exclude-from-cart')) return

        const product = JSON.parse(event.target.dataset.product)

        try {
            await fetch(`/stock/${product.id}/increment`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quant: 1 })
            });
        } catch (error) {
            console.error('Erro ao devolver ao estoque:', error)
            return alert('Erro ao devolver o produto.')
        }

        cart.exclude(product)

        showCarrinho()
    })

    //localStorage.removeItem(KEY)
    showCarrinho()
    console.log(checkoutModal)
    console.log(btnCheckout.dataset.checkout)
})()