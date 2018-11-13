import settings from "../../Settings";
import axios from "axios";
import Connection from "../minigame/Connection";

export default class MiniGameScore {
    private group_id: string;
    private current_score: number;
    private minigame_name: string;
    private pusher;

    constructor(group_id: string, minigame_name: string) {
        this.group_id = group_id;
        this.current_score = 0;
        this.minigame_name = minigame_name;
        this.pusher = Connection.getSocketConnection;
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
      public broadcastScore(group_id, setScore) {
        var channel = this.pusher.subscribe('score-' + group_id);
        channel.bind('score_updated', function(data) {
          if(data.method === "udpate") {
            setScore(data.current_score);
          }
        });
        return channel;
      }
}