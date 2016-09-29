import axios from 'axios';
import dispatcher from '../../dispatcher';

export function fetchMenu(location) {
  dispatcher.dispatch({type: 'FETCH_MENU'});
  axios.get('http://travelaersite.dev/wordpress/wp-json/wp-api-menus/v2/menu-locations/' + location).then(function(response) {
    setTimeout(function() {
      dispatcher.dispatch({type: 'RECEIVE_MENU', menu: response.data});
    }, 0);
  }).catch(function(error) {
    console.log(error);
  });
}
