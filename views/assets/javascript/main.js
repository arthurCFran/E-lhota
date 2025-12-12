import * as product from './module/products/product.js'
import * as cart from './module/cart/cart.js'
import * as ui from './utils/ui/ui.js'
import * as category from './module/category/category.js'

(() => {
    "use strict"

    let products = []
    let currentCategory = 'all'
    const productList = document.querySelector("#product-list")
    const categoryFilter = document.querySelector('#category-filters')

    const showProducts = async () => {
        products = await product.get()

        if (products.length === 0) {
            productList.innerHTML = ui.cardProductEmpty()
            return
        }

        ui.updateStatus('', 'none')
        renderProducts(products)
    }

    const renderProducts = (products) => {
        productList.innerHTML = ''
        products.forEach(product => {
            const col = ui.cardProduct(product)
            const modal = ui.modalButton(product);
            productList.appendChild(col)
            document.body.appendChild(modal);
        })
    }

    const showCategories = async () => {
        const categories = await category.get()
        if (categories.length === 0) {
            return
        }
        categories.forEach(cat => {
            const button = ui.buttonCategory(cat.category)
            categoryFilter.appendChild(button)

        })
    }

    categoryFilter.addEventListener('click', (event) => {
        const btn = event.target.closest('.filter-btn')
        if (!btn) return  // clique não foi em um botão

        const { category } = btn.dataset

        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'))
        btn.classList.add('active')

        currentCategory = category
        applyFilters()
    })

    const applyFilters = () => {
        let productsFiltered = products
        if (currentCategory !== 'all') {
            productsFiltered = productsFiltered.filter(p => p.category === currentCategory)
        }

        renderProducts(productsFiltered)
    }

    productList.addEventListener('click', async (event) => {
        if (!event.target.classList.contains('add-to-cart')) return

        const product = JSON.parse(event.target.dataset.product)

        if (product.quantity <= 0) return alert('Produto sem estoque disponivel!')

        try {
            await fetch(`/stock/${product.id}/decrement`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ quant: 1 })
            });
        } catch (error) {
            console.error('Erro ao diminuir estoque:', error);
            return alert('Erro ao adicionar produto ao carrinho.')
        }
        
        product.quantity -= 1

        cart.add(product)
    })

    ui.updateStatus('Carregandp produtos...', "info")
    showProducts()
    showCategories()
})()