const API_URL_PRODUCTS = "https://fakestoreapi.com/products"

const get = async () => {
  try {
    const response = await fetch(API_URL_PRODUCTS)
    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export { get }