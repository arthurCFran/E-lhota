
const API_URL_PRODUCTS = "http://localhost:3000/products"

const get = async () => {
  try {
    const response = await fetch(API_URL_PRODUCTS)
    if (!response.ok){
      throw new error ('Falha ao carregar os dados')
    }

    const data = await response.json()
    return data
  } catch (error) {
    console.error('Error fetching products:', error)
    return []
  }
}

export { get }