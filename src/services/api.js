import axios from 'axios'
export const USERS = process.env.USERS
export const CART = process.env.CART
export const MONTHLY_PURCHASE = process.env.MONTHLY_PURCHASE
export const ADDRESS = process.env.ADDRESS
export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
export const PRODUCTS = process.env.PRODUCTS
export const COMISSIONS = process.env.COMISSIONS
export const ORDERS = process.env.ORDERS
export const INVOICES = process.env.INVOICES
export const CONSTANTS = process.env.CONSTANTS
export const OPENPAY_ID = process.env.OPENPAY_ID
export const OPENPAY_KEY = process.env.OPENPAY_KEY

const axiosInstance = axios.create({
  baseURL: ''
})

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    let message = ''
    if (error.response.status === 503) {
      message = 'Por favor intenté más tarde, si el error persiste contacte al soporte de Inmunosalud.'
    }
    if (error.response.status === 404) {
      message = 'Error al enviar la petición.'
    } else if (error.response.data && error.response.data.message && error.response.data.message.error) {
      const { data } = error.response
      message = data.message.error
    } else {
      message =
        'Existe un problema con el servicio, intente de nuevo mas tarde, si el problema persiste contacte a soporte.'
    }

    // if (error.response.status === 401) {
    //   console.error('RESPONSE 401')
    // localStorage.removeItem('persist:root')
    // window.location.href = '/login'
    //   return Promise.reject(message)
    // }

    console.error('Axios Response Error: ', error.response, message)
    return Promise.reject(error)
  }
)

export const api_get = (url, headers = {}) => {
  return new Promise((res, rej) => {
    axiosInstance
      .get(url, headers)
      .then(({ data }) => {
        res(data)
      })
      .catch(err => {
        return rej(err)
      })
  })
}

export const api_post = (url, body, headers = {}) => {
  return new Promise((res, rej) => {
    axiosInstance
      .post(url, body, headers)
      .then(({ data }) => {
        res(data)
      })
      .catch(err => {
        return rej(err)
      })
  })
}

export const api_put = (url, body, headers = {}) => {
  return new Promise((res, rej) => {
    axiosInstance
      .put(url, body, headers)
      .then(({ data }) => {
        res(data)
      })
      .catch(err => {
        return rej(err)
      })
  })
}

export const api_delete = (url, body, headers = {}) => {
  return new Promise((res, rej) => {
    axiosInstance
      .delete(url, { ...headers, data: body })
      .then(({ data }) => {
        res(data)
      })
      .catch(err => {
        return rej(err)
      })
  })
}

export const api_patch = (url, body, headers = {}) => {
  return new Promise((res, rej) => {
    axiosInstance
      .patch(url, body, headers)
      .then(({ data }) => {
        res(data)
      })
      .catch(err => {
        return rej(err)
      })
  })
}
