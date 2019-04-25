import RestService from './RestService'

const CerService = {}

CerService.setToken = (token) => {
    RestService.defaults.headers['session'] = token
}

CerService.get = function(endpoint) {

    return RestService.get(endpoint)
        .then(res => {
            if (res.status === 200) {
                // console.log('200');
            }
            return res.data;
        }).catch(err => {
            console.log(err);
            console.log('Error API');

            if (err.response && err.response.status === 403) {
                // location.reload()
            }
        })
}

CerService.delete = function(endpoint) {

    return RestService.delete(endpoint)
        .then(res => {
            if (res.status === 200) {
                // console.log('200');
            }
            return res.data;
        }).catch(err => {
            console.log(err);
            console.log('Error al Eliminar');
        })
}

CerService.post = function(endpoint, json) {

    return RestService.post(endpoint, json)
        .then(res => res.data)
        .catch(err => {
            console.log(err);
            console.log('Error API');
            
            if (err.response && err.response.status === 403) {
                // location.reload()
            }
        })
}

CerService.put = function(endpoint, json) {

    return RestService.put(endpoint, json)
        .then(res => res.data)
}

export default CerService