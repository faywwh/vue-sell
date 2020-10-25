import axios from 'axios'

const env = process.env.NODE_ENV
if (env === 'development') {
  axios.defaults.baseURL = '/'
} else if (env === 'production') {
  axios.defaults.baseURL = '/sell'
}

const ERR_OK = 0

export function get(url) {
  return function (params) {
    return axios.get(url, { params }).then(res => {
      const { errno, data } = res.data
      if (errno === ERR_OK) {
        return data
      }
    }).catch(err => console.log(err))
  }
}
