import {GlobalStorage} from '../core/store/store';

export class CommonData {

    static async getPlayerName(){
        return await GlobalStorage.getItem('player_name').then(function (response) {return response});
    }
    static async getGroupName(){
       return await GlobalStorage.getItem('group_name').then(function (response) {return response});
    }
    static async getGroupId(){
        return await GlobalStorage.getItem('group_id').then(function (response) {return response});
    }
    static async getPlayerId(){
        return await GlobalStorage.getItem('player_id').then(function (response) {return response});
    }
}