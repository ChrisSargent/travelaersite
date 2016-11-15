import axios from 'axios';
import dispatcher from '../dispatcher';
import globals from '../lib/globals'

export function fetchTeam() {
  dispatcher.dispatch({type: 'FETCH_TEAM'});
  axios.get(globals.jsonUrl + '/wp/v2/team_member/').then(function(response) {
    // Just in a timeout to simulate network latency in dev
    setTimeout(function() {
      dispatcher.dispatch({type: 'RECEIVE_TEAM', team: response.data});
      // console.log('Team:', response.data);
    }, 0);
  }).catch(function(error) {
    console.log(error);
  });
}
