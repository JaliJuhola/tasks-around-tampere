import { AsyncStorage } from "react-native";


export default class GlobalStorage {
    static setItem(key, value) {
        AsyncStorage.setItem(key, value);
    }
    static getItem(key) {
        return AsyncStorage.getItem(key);
    }

}
