import axios from 'axios'

export default {

    //Url da API
    serverURI: 'http://localhost/api',

    request(method, uri, data = null, headers) {
        if (!method) {
            console.error('API function call requires method argument')
            return
        }
        if (!uri) {
            console.error('API function call requires uri argument')
            return
        }
        if (!headers) {
            console.error('API function call requires uri argument')
            return
        }

        var url = this.serverURI + uri

        const options = {
            method: method,
            headers: headers,
            data: data,
            url,
        };
        return axios(options)
    },

}