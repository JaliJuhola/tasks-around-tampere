import { AsyncStorage } from "react-native";


export default class GlobalStorage {
    static async setItem(key, value) {
        AsyncStorage.setItem(key, value);
    }
    static async getItem(key) {
        AsyncStorage.getItem(key);
    }

}
