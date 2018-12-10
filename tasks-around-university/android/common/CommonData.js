import {GlobalStorage} from '../core/store/store';

export class CommonData {

    static async getPlayerName(){
        var player = await GlobalStorage.getItem('player');
        return player.name;
    }
    static async getGroupName(){
        var group = await GlobalStorage.getItem('player');
        return group.name;
    }
    static async getGroupId(){
        var group = await GlobalStorage.getItem('player');
        return group.id;
    }
    static async getPlayerId(){
        var group = await GlobalStorage.getItem('player');
        return group.id;
    }
}