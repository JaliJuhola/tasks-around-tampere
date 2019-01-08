import axios from 'axios';
import settings from '../../Settings';
import GlobalStorage from '../store/store';

export class Http {

    static async getToken() {
        var token =  await GlobalStorage.getItem("token");
        if(!token) {
            if(!settings.reauth_automatically) {
                throw Error("Failed to fetch token, reauth is needed");
            } else {
                var status =  axios.post(settings['rest_api_url'] + 'api/auth/', {
                    name: "pseudoname",
                })
                token = status.token;
            }
        }
        return token;
    }
    static async post(url_extensions, data) {
        var token = await this.getToken();
        return axios.post(settings['rest_api_url'] + url_extensions, data, {headers: {'Authorization': token}})
          .then(function (response) {
            return response;
          })
          .catch(function (error) {
            return {'error': error};
        })
    }
    static async get(url_extensions) {
        var token = await this.getToken();
        return axios.get(settings['rest_api_url'] + url_extensions, {headers: {'Authorization': token}})
          .then(function (response) {
            return response;
          })
          .catch(function (error) {
            return {'error': error};
        })
    }
    static async patch(url_extensions, data) {
        var token = await this.getToken();
        return axios.patch(settings['rest_api_url'] + url_extensions, data, {headers: {'Authorization': token }})
          .then(function (response) {
            return response;
          })
          .catch(function (error) {
            return {'error': error};
          })
    }
}