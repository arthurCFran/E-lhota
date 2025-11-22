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
        products.forEach(product => {
            const col = ui.cardProduct(product)
            renderProducts(products)
        })
    }

    const renderProducts = (products) => {
        productList.innerHTML =' '
        products.forEach(product => {
            const col = ui.cardProduct(product)
            productList.appendChild(col)
        })
        addCartEventListner()
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
        addFilterEventListner()
    }
    const addFilterEventListner = () => {
        const buttons = document.querySelectorAll('.filter-btn')
        if (buttons.length > 0) {
            buttons.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    const { category } = event.currentTarget.dataset
                    buttons.forEach(b => {
                        b.classList.remove('active')
                        event.currentTarget.classList.add('active')
                        currentCategory = category
                        applyFilters()
                    }
                    )
                })
            })
        }
    }

    const applyFilters = () => {
        let productsFiltered = products 
        if (currentCategory !== 'all'){
            productsFiltered = productsFiltered.filter(p => p.category === currentCategory )
        }

        renderProducts(productsFiltered)
    }

    const addCartEventListner = () => {
        const buttons = document.querySelectorAll('.add-to-cart')
        if(buttons.length > 0){
            buttons.forEach(btn => {
                btn.addEventListener('click', (event) => {
                    const { id, title, price, image } = event.currentTarget.dataset
                    cart.add({id: Number(id), title, price: Number(price), image}, 1)
                })
            })
        }
    }

    ui.updateStatus('Carregandp produtos...', "info")
    showProducts()
    showCategories()
})()