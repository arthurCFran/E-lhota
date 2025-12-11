const URL_CATEGORIES = "http://localhost:3000/categories"

const get = async () => {
    try {
        const response = await fetch(URL_CATEGORIES)
        const data = await response.json()
        return data
    } catch (error) {
        console.error('Error fetching categories:', error)
        return []
    }
}

export {get}