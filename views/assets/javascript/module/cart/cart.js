const KEY = 'carrinho-digital'

const load = () => {
    const data = localStorage.getItem(KEY)
    let _default = { items: [], updatedAt: Date.now() }
    if (!data) {
        return _default
    }
    try {
        const obj = JSON.parse(data)
        
        return (obj && Array.isArray(obj.items)) ? obj : _default

    } catch {
        return _default
    }
}



const save = (cart) => {
    localStorage.setItem(KEY, JSON.stringify(cart))
}

const add = (product, quantityReq = 1) => {
    const cart = load()
    
    product.quantityReq = quantityReq
    const index = cart.items.findIndex(i => i.id === product.id)
    if (index !== -1){
        cart.items[index].quantityReq += quantityReq
    } else {
        cart.items.push(product)

    }
    cart.updatedAt = Date.now()
    save(cart)
    alert('Produto adicionado ao carrinho!')
}

const exclude = (product) => {
    const cart = load()

    const index = cart.items.findIndex(i => i.id === product.id)
    
    if (index == -1) {
        console.error('Produto não encontrado no carrinho!')
        return alert('Produto não encontrado no carrinho!')
    }

    cart.items[index].quantityReq -= 1
    cart.items[index].quantity += 1

    if (cart.items[index].quantityReq <= 0){
        cart.items.splice(index, 1)
    }

    cart.updatedAt = Date.now()
    save(cart)
    alert('Produto retirado do carrinho!')
}

const get = () => {
    const cart = load()
    return cart.items
}

export { add, get, exclude }