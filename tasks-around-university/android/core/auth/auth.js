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
            GlobalStorage.setItem("token", response['data']['token']);
            return response;
          })
          .catch(function (error) {
            return error;
        });
        return status
    }
    static async join_group(group_id) {

        var status = await Http.post('api/group/player', {
            group_id: group_id,
        }).then(function (response) {
            console.log(response['data'])
            GlobalStorage.setItem("player_id", response['data']['player_id'] + '');
            GlobalStorage.setItem("player_name", response['data']['player_name'] + '');
            GlobalStorage.setItem("group_id", response['data']['group_id']+ '');
            GlobalStorage.setItem("group_name", response['data']['group_name']+ '');
            return response;
          })
        if('error' in status) {
            return false;
        }

        return true;
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