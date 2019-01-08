import { Actions } from 'react-native-router-flux';
import {Http} from '../../core/connections/http';

class MiniGameEntry {

    static enter_lobby(minigame_target_str) {
        Http.post('api/lobby',{
            minigame_name: minigame_target_str
        }).then(function (response) {
            Actions.lobby({data : {lobby_id: response['data']['lobby_id'], minigame_target_str: minigame_target_str}});
        }).catch(function (error) {
            alert("failed to conenct lobby!");
        });
    }
    static enter_minigame(minigame_str, closing) {
        switch(minigame_str) {
            case "push_the_buttons":
            if(closing) {
                Http.post('api/push_the_buttons', {}).then(function(){
                    return Actions.push_the_buttons();
                })
            } else {
                Actions.push_the_buttons()
            }
                break
            case "cache":
                Http.post('api/geocache/', {}).then(function(){
                    return Actions.cache()
                })
                break;
            case "alias":
                Actions.alias();
                break;
            case "quiklash":
                Actions.quiklash();
                break;
            default:
                console.log("invalid minigame_str in static enter_minigame(minigame_str)")
        }
    }
}
export default MiniGameEntry;