import {MinigameEntry} from '../minigame/Channels';
import { Actions } from 'react-native-router-flux';

class MiniGameEntry {

    static startMinigame(minigame_str) {
        let mge = new MinigameEntry()
        mge.connectLobby();
        let all_players_connected = false;
        // Render lobby
        while(!all_players_connected) {
            all_players_connected = mge.game_started();
        }
        return MiniGameEntry.enter_minigame(minigame_str);

    }
    static enter_minigame(minigame_str) {
        switch(minigame_str) {
            case "push_the_buttons":
                Actions.push_the_buttons()
                break;
            case "nada":
                console.log("nada")
                break;
            default:
                console.log("invalid minigame_str in static enter_minigame(minigame_str)")
                Actions.pop()
        }
    }
}
export default MiniGameEntry;