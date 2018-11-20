import axios from 'axios';
import settings from '../../Settings';
import GlobalStorage from '../store/store';

export default class Auth {
    static fetch_or_create_user(username : String, force: Boolean = false) : Boolean {
        if(GlobalStorage.getItem("token") && !force) {
            axios.defaults.headers.common['Authorization'] = GlobalStorage.getItem("token");
            return true;
        }
        axios.post(settings['rest_api_url'] + 'api/auth/', {
            name: username,
          })
          .then(function (response) {
            GlobalStorage.setItem("token", response['token']);
            return true;
          })
          .catch(function (error) {
            return false;
        });
        return false;
    }
    static join_group(group_id) : Boolean {
        axios.post(settings['rest_api_url'] + 'api/auth/', {
            name: group_id,
          })
          .then(function (response) {
            GlobalStorage.setItem("token", response['token']);
            return true;
          })
          .catch(function (error) {
            return false;
        });
        return false;
    }
}