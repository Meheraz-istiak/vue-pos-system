import axios from 'axios'

const axiosIns = axios.create({
// You can add your headers here
// ================================
// baseURL: 'https://api.escuelajs.co/api/v1/',
// timeout: 1000,
// headers: {'X-Custom-Header': 'foobar'}
})

export default axiosIns
