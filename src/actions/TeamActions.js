import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchTeam() {
  dispatcher.dispatch({type: 'FETCH_TEAM'});
  dispatcher.dispatch({type: 'LOADING', id: 'fetchTeam'});
  axios.get('/wp/v2/team_member/').then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_TEAM', team: response.data});
    dispatcher.dispatch({type: 'FINISHED_LOADING', id: 'fetchTeam'});
  }).catch(function(error) {
    console.log(error);
  });
}
