import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchTeam() {
  dispatcher.dispatch({type: 'FETCH_TEAM'});
  axios.get('/wp/v2/team_member/').then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_TEAM', team: response.data});
    // console.log('Team:', response.data);
  }).catch(function(error) {
    console.log(error);
  });
}
