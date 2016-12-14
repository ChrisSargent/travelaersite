import axios from 'axios';
import dispatcher from '../dispatcher';

export function addComment(paramsString) {
  dispatcher.dispatch({type: 'ADDING_COMMENT'});
  axios.post('/wp/v2/comments' + paramsString).then(function(response) {
    dispatcher.dispatch({type: 'ADDED_COMMENT', comments: response.data});
    console.log(response.data);
  }).catch(function(error) {
    dispatcher.dispatch({type: 'ERROR_COMMENT'});
    console.log(error.message);
  });
}
