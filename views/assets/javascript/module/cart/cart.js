const KEY = 'apenas-os-forter-sobrevivem'

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

const add = (product, quantity = 1) => {
    const cart = load()

    const index = cart.items.findIndex(i => {i.id === product.id})
    if (index >= 0){
        cart.items[index].quantity += quantity
    } else {
        cart.items.push({...product, quantity: quantity})
    }

    cart.updatedAt = Date.now()
    save(cart)
    alert('Produto adicionado ao carrinho!')
}

export { add }