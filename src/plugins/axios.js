import axios from 'axios'

export default {

    //serverURI: 'http://localhost/api',
    serverURI: 'https://stormy-bastion-27921.herokuapp.com/api',

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