import axios from "axios";
import dispatcher from "../../dispatcher";

export function fetchMenu( location ) {
  dispatcher.dispatch({ type: "FETCH_MENU" });
  axios.get("http://travelaersite.dev/wordpress/wp-json/wp-api-menus/v2/menu-locations/" + location, {
    // params: {
    //     ID: 12345
    // }
  }).then( function( response ) {
    dispatcher.dispatch({ type: "RECEIVE_MENU", menu: response.data });
    console.log( response );
  }).catch( function( error ) {
    console.log( error );
  });
}
