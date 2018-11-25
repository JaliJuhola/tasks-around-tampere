import axios from 'axios';
import settings from '../../Settings';
import GlobalStorage from '../store/store';
import {Http} from '../connections/http';
export class Auth {

    static async fetch_or_create_user(username, force = false) {
        if(await GlobalStorage.getItem("token") && !force) {
            console.log("if(GlobalStorage.getItem(token) && !force) {")
            return true;
        }
        var status = await axios.post(settings['rest_api_url'] + 'api/auth/', {
            name: username,
          })
          .then(function (response) {
            return response;
          })
          .catch(function (error) {
            return error;
        });
        GlobalStorage.setItem("token", status['data']['token']);
        return status
    }
    static async join_group(group_id) {
        return await Http.post('api/group/player', {
            name: group_id,
        })
    }
}