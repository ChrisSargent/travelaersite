import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchMenu(location) {
  dispatcher.dispatch({type: 'FETCH_MENU'});
  dispatcher.dispatch({type: 'LOADING', id: 'fetchMenu'});
  axios.get('/wp-api-menus/v2/menu-locations/' + location).then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_MENU', menu: response.data});
    dispatcher.dispatch({type: 'FINISHED_LOADING', id: 'fetchMenu'});
  }).catch(function(error) {
    console.log(error);
  });
}
