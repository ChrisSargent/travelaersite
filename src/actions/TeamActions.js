import axios from 'axios';
import dispatcher from '../dispatcher';

export function fetchTeam() {
  const params = {
    fields: 'acf,content,id,title,menu_order'
  }
  dispatcher.dispatch({type: 'FETCH_TEAM', id: 'fetchTeam', loading: true});
  axios.get('/wp/v2/team_member', {params}).then(function(response) {
    // console.log(response.data);
    dispatcher.dispatch({type: 'RECEIVE_TEAM', team: response.data, id: 'fetchTeam', loading: false});
  }).catch(function(error) {
    console.log(error);
  });
}

// Before: 4.7KB, After: 3.1KB

// Available Fields
// _links: Object
// acf: Object
// content: Object
// date: "2016-11-15T11:54:18"
// date_gmt: "2016-11-15T11:54:18"
// guid: Object
// id: 217
// link: "http://travelaersite.dev/wordpress/team_member/mike-slone/"
// menu_order: 1
// modified: "2016-11-17T13:39:33"
// modified_gmt: "2016-11-17T13:39:33"
// slug: "mike-slone"
// template: ""
// title: Object
// type: "team_member"
