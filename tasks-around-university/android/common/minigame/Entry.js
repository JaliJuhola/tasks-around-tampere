import {MinigameEntry} from '../minigame/Channels';
import { Actions } from 'react-native-router-flux';

class MiniGameEntry {

    static startMinigame(minigame_str) {
        var mge = true;
        var all_players_connected = false;
        while(!all_players_connected) {
            all_players_connected = true;
        }
        return MiniGameEntry.enter_minigame(minigame_str);
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