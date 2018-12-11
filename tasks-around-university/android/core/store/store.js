import { AsyncStorage } from "react-native";


export default class c {
    static async setItem(key, value) {
        AsyncStorage.setItem(key, value);
    }
    static async getItem(key) {
        return AsyncStorage.getItem(key);
    }

}
