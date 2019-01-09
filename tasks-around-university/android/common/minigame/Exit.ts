import { Actions } from 'react-native-router-flux';
// import {MinigameEntry} from '../minigame/Channels';

class MiniGameExit {

    public static exitGame() {
        Actions.main_map();
    }
}
export default MiniGameExit;