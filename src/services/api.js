import axios from 'axios'
export const PROYECT = 'https://7wcx345m58.execute-api.us-east-1.amazonaws.com'
export const HOST_CART = 'https://xucsfbspv3.execute-api.us-east-1.amazonaws.com'
export const PROYECT_PRODUCTS = 'https://b3pjrwk6u3.execute-api.us-east-1.amazonaws.com'
export const COMISSIONS = 'https://ngn5zgk4a1.execute-api.us-east-1.amazonaws.com'
export const ORDERS = 'https://a57zeomz3a.execute-api.us-east-1.amazonaws.com'
const axiosInstance = axios.create({
  baseURL: ''
})

axiosInstance.interceptors.response.use(
  response => {
    return response
  },
  error => {
    let message = ''
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
