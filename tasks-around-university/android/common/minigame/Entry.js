import {MinigameEntry} from '../minigame/Channels';
import { Actions } from 'react-native-router-flux';
import {Http} from '../../core/connections/http';

class MiniGameEntry {

    static enter_lobby(minigame_str) {
        Http.post('api/lobby',{
            minigame_name: minigame_str
        }).then(function (response) {
            console.log(response['data']['lobby_id'])
            Actions.lobby({lobby_id: response['data']['lobby_id'], target_str: minigame_str});
        }).catch(function (error) {
            alert("failed to conenct lobby!");
        });
    }
    static enter_minigame(minigame_str) {
        switch(minigame_str) {
            case "push_the_buttons":
                Actions.push_the_buttons()
                break;
            case "geocache":
                Actions.geocache();
                break;
            case "alias":
                Actions.alias();
            case "quiklash":
                Actions.quiklash();
            default:
                console.log("invalid minigame_str in static enter_minigame(minigame_str)")
                Actions.pop()
        }
    }
}
export default MiniGameEntry;