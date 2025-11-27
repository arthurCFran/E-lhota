const API_URL_CATEGORIES = "https://fakestoreapi.com/products/categories"

const get = async () => {
    try {
        const response = await fetch(API_URL_CATEGORIES)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching categories:', error)
        return []
    }
}

export {get}