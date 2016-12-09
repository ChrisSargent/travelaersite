import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchMenu(location) {
  console.log(location);
  dispatcher.dispatch({type: 'FETCH_MENU', id: 'fetchMenu', loading: true});
  axios.get('/wp-api-menus/v2/menu-locations/' + location).then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_MENU', menu: response.data, location: location, id: 'fetchMenu', loading: false});
    // console.log(response.data);
  }).catch(function(error) {
    console.log(error);
  });
}
