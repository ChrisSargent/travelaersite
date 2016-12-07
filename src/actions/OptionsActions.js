import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchOptions() {
  dispatcher.dispatch({type: 'FETCH_OPTIONS', id: 'fetchOptions', loading: false});
  axios.get('/acf/v2/options').then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_OPTIONS', options: response.data.acf, id: 'fetchOptions', loading: false});
    // console.log(response.data);
  }).catch(function(error) {
    console.log(error);
  });
}
