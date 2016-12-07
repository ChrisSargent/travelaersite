import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchSite() {
  dispatcher.dispatch({type: 'FETCH_SITE', id: 'fetchSite', loading: true});
  axios.get('').then(function(response) {
    dispatcher.dispatch({type: 'RECEIVE_SITE', site: response.data, id: 'fetchSite', loading: false});
    console.log(response.data);
  }).catch(function(error) {
    console.log(error);
  });
}

// 61KB before removing fields

// Available Fields
// _links: Object
// authentication: Array[0]
// description: "Just another WordPress site"
// home: "http://travelaersite.dev/wordpress"
// name: "Travalaer"
// namespaces: Array[4]
// routes: Object
// url: "http://travelaersite.dev/wordpress"
// __proto__: Object
