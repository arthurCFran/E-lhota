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

const add = (id, quantity = 1, title, category) => {
    const cart = load()
    console.log(cart)

    const index = cart.items.findIndex(i => {i.id === id})
    if (index >= 1){
        cart.items[index].quantity += quantity
    } else {
        cart.items.push({id, title, category:category, rating:rating , quantity: quantity})

    }
    console.log(product)
    cart.updatedAt = Date.now()
    save(cart)
    alert('Produto adicionado ao carrinho!')
}
load()

export { add }