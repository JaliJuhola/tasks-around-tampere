import axios from 'axios';
import settings from '../../Settings';
import GlobalStorage from '../store/store';
import {Http} from '../connections/http';
export class Auth {
    static async fetch_or_create_user(username, force = true) {
        var status = await axios.post(settings['rest_api_url'] + 'api/auth/', {
            name: username,
          })
          .then(function (response) {
            console.log(response)
            return response;
          })
          .catch(function (error) {
            return error;
        });
        GlobalStorage.setItem("token", status['data']['token']);
        console.log(status['data'])
        return status
    }
    static async join_group(group_id) {
        var status = await Http.post('api/group/player', {
            group_id: group_id,
        })
        return !('error' in status)
    }
    static async check_auth()  {
        if(await GlobalStorage.getItem("token")) {
            console.log("player is logged in");
            return true;
        }
        console.log("player is not logged in");
        return false;
    }
}