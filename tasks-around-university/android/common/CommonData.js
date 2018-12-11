import {GlobalStorage} from '../core/store/store';

export class CommonData {

    static async getPlayerName(){
        return await GlobalStorage.getItem('player_name');
    }
    static async getGroupName(){
       return await GlobalStorage.getItem('group_name');
    }
    static async getGroupId(){
        return await GlobalStorage.getItem('group_id');
    }
    static async getPlayerId(){
        return await GlobalStorage.getItem('player_id');
    }
}