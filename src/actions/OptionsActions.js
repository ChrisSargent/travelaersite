import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchOptions() {
  dispatcher.dispatch({type: 'FETCH_OPTIONS'});
  dispatcher.dispatch({type: 'LOADING', id: 'fetchOptions'});
  axios.get('/acf/v2/options').then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_OPTIONS', options: response.data.acf});
    dispatcher.dispatch({type: 'FINISHED_LOADING', id: 'fetchOptions'});
  }).catch(function(error) {
    console.log(error);
  });
}
