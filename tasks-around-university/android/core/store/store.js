import { AsyncStorage } from "react-native";


export default class GlobalStorage {
    static setItem(key, value) {
        return AsyncStorage.setItem(key, value);
    }
    static async getItem(key) {
        return AsyncStorage.getItem(key);
    }
    static async deleteItem(key) {
        return AsyncStorage.setItem(key, "");
    }

}
