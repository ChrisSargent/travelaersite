import axios from 'axios';
import dispatcher from '../dispatcher';
import globals from '../lib/globals'

export function fetchMenu(location) {
  dispatcher.dispatch({type: 'FETCH_MENU'});
  // Just in a timeout to simulate network latency in dev
  axios.get(globals.jsonUrl + '/wp-api-menus/v2/menu-locations/' + location).then(function(response) {
    setTimeout(function() {
      dispatcher.dispatch({type: 'RECEIVE_MENU', menu: response.data});
    }, 0);
  }).catch(function(error) {
    console.log(error);
  });
}
