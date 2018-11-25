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
        console.log("************************************");
        console.log(status['data'])
        console.log("************************************");
        return status
    }
    static async join_group(group_id) {

        var status = await Http.post('api/group/player', {
            group_id: group_id,
        })
        if('error' in status) {
            return false;
        }
        var player = {
            id: status['data']['player_id'],
            name: status['data']['player_name'],
        }
        var group = {
            id: status['data']['group_id'],
            name: status['data']['group_name'],
        }
        GlobalStorage.setItem("player", player);
        GlobalStorage.setItem("group", group);

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