import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchMenu(location) {
  dispatcher.dispatch({type: 'FETCH_MENU'});
  axios.get('/wp-api-menus/v2/menu-locations/' + location).then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_MENU', menu: response.data});
  }).catch(function(error) {
    console.log(error);
  });
}
