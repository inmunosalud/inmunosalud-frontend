import axios from 'axios'
export const USERS = 'https://vu7mo4k6he.execute-api.us-east-1.amazonaws.com'
export const HOST_CART = 'https://mbl4fgifp7.execute-api.us-east-1.amazonaws.com'
export const HOST_MONTHLY_PURCHASE = 'https://fiwnd962ol.execute-api.us-east-1.amazonaws.com'
export const PROJECT_ADDRESS = 'https://63a9nz7ww9.execute-api.us-east-1.amazonaws.com'
export const PROJECT_PAYMENT_METHODS = 'https://3sdv3a6phe.execute-api.us-east-1.amazonaws.com'
export const PROJECT_CONTRACT = 'https://vu7mo4k6he.execute-api.us-east-1.amazonaws.com'
export const PROYECT_PRODUCTS = 'https://vf5ybznisi.execute-api.us-east-1.amazonaws.com'
export const COMISSIONS = 'https://texfh6ms7h.execute-api.us-east-1.amazonaws.com'
export const ORDERS = 'https://xw7d0opao6.execute-api.us-east-1.amazonaws.com'
export const INVOICES = 'https://h0d2ixtch4.execute-api.us-east-1.amazonaws.com'
export const CONSTANTS = 'https://qxpmqlakma.execute-api.us-east-1.amazonaws.com'
export const STRIPE = 'https://vu7mo4k6he.execute-api.us-east-1.amazonaws.com'
export const OPENPAY_ID = 'mmp8mqnd0myfw4i8byx2'
export const OPENPAY_KEY = 'pk_6c5fc6fe79e444199710ba138534f9d0'
// sandbox
// export const OPENPAY_ID = 'maa7v96xww9vj0ftkvuo'
// export const OPENPAY_KEY = 'pk_a88142ad4f154712a9a7c0cf73e00af3'

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
