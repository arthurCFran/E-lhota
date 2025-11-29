import * as product from './module/products/product.js'
import * as cart from './module/cart/cart.js'
import * as ui from './utils/ui.js'
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
        categories.forEach(category => {
            const button = ui.buttonCategory(category)
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

    productList.addEventListener('click', (event) => {
        if (!event.target.classList.contains('add-to-cart')) return

        const { id, title, price, image, description, quantity, rating, category } = event.target.dataset
        cart.add({
            id: Number(id),
            title: String(title),
            price: Number(price),
            image: String(image),
            quantity: Number(quantity),
            rating: Number(rating),
            category: String(category),
            description: String(description)
        }, 1)
    })

    ui.updateStatus('Carregandp produtos...', "info")
    showProducts()
    showCategories()
})()