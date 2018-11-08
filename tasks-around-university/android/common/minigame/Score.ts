import settings from "../../Settings";
import axios from "axios";
class MiniGameScore {
    private group_id: string;
    private current_score: number;
    private minigame_name: string;

    constructor(group_id: string, minigame_name: string) {
        this.group_id = group_id;
        this.current_score = 0;
        this.minigame_name = minigame_name;
      }

    public increaseScore(score_to_add) : boolean {
        const score_api = settings.rest_api_url + "/"+ this.minigame_name + "/groups/" + this.group_id + "/score/increase";

        axios.put(score_api, {amount:  score_to_add, groupd_id: this.group_id})  
        .then(function (response) {
            return true;
          })
          .catch(function (error) {
              return false;
          })
        return true;
      }
      public resetScore(score_to_add) : boolean {
        const score_api = settings.rest_api_url + "/"+ this.minigame_name + "/groups/" + this.group_id + "/score/reset";

        axios.post(score_api, {amount:  score_to_add, groupd_id: this.group_id})  
        .then(function (response) {
            return true;
          })
          .catch(function (error) {
              return false;
          })
        return true;
      }
}