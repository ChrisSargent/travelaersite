import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchSite() {
  dispatcher.dispatch({type: 'FETCH_SITE'});
  dispatcher.dispatch({type: 'LOADING', id: 'fetchSite'});
  axios.get('').then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_SITE', site: response.data});
    dispatcher.dispatch({type: 'FINISHED_LOADING', id: 'fetchSite'});
  }).catch(function(error) {
    console.log(error);
  });
}
