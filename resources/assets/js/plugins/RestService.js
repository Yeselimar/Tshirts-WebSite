import axios from 'axios'
import config from '../config'
//import config from '/config.json'
let token = process.browser ? JSON.parse(localStorage.getItem('user-token')) : null
const RestService = axios.create({
        //baseURL: config.apiURL
        baseURL: config.api.base,
        headers: {
            'Content-Type': 'application/json',
        }
        /*headers: {
            'token': config.api.token,
            'session': token ? token.session : ''
        }*/
    })
    //RestService.defaults.headers.post['Content-Type'] = 'application/json'

export default RestService