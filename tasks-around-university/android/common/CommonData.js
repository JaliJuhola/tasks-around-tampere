import {GlobalStorage} from '../core/store/store';

export class CommonData {

    static socketConnection = undefined;
    static getPlayerName = () => {
        var player = GlobalStorage.getItem('player');
        return player.player_name;
    }
    static getGroupName = () =>  {
        var group = GlobalStorage.getItem('player');
        return group.group_name;
    }
    static getGroupId = () =>  {
        var group = GlobalStorage.getItem('player');
        return group.id;
    }
    static getPlayerId= () =>  {
        var group = GlobalStorage.getItem('player');
        return group.id;
    }
}