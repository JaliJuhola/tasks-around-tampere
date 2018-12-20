import settings from "../../Settings";
import axios from "axios";
import Connection from "../minigame/Connection";

export default class MiniGameScore {
    constructor(group_id, minigame_name) {
        this.group_id = group_id;
        this.current_score = 0;
        this.minigame_name = minigame_name;
        this.pusher = Connection.getSocketConnection;
      }

    increaseScore(score_to_add) {
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
     resetScore(score_to_add) {
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
    broadcastScore(setScore) {
        var channel = this.pusher.subscribe('score-' + this.group_id);
        channel.bind('score_updated', function(data) {
          if(data.method === "udpate") {
            setScore(data.current_score);
          }
        });
        return channel;
      }
}