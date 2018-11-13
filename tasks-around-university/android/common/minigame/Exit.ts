import { Actions } from 'react-native-router-flux';
import {MinigameEntry} from '../minigame/Channels';

class MiniGameExit {

    public static exitGame() {
        let minigame = new MinigameEntry();
        //#TODO Close sockets connections
        Actions.main_game();
    }
}