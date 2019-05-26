import axios from 'axios'

export const PRODUCTS_URL =
  'https://5cea51030c871100140bf46e.mockapi.io/api/products'

export async function getProducts({ page = 1, limit = 10 } = {}) {
  const { data } = await axios({
    method: 'GET',
    url: PRODUCTS_URL,
    params: {
      page,
      limit,
    },
  })
  return data
}

export async function getProductById(id) {
  const { data } = await axios.get(`${PRODUCTS_URL}/${id}`)
  return data
}
