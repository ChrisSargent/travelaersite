import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchOptions() {
  dispatcher.dispatch({type: 'FETCH_OPTIONS'});
  axios.get('/acf/v2/options').then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_OPTIONS', options: response.data.acf});

  }).catch(function(error) {
    console.log(error);
  });
}
