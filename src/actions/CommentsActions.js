import axios from 'axios';
import dispatcher from '../dispatcher';

import * as PostsActions from '../actions/PostsActions';

export function addComment(paramsString) {
  dispatcher.dispatch({type: 'ADDING_COMMENT'});
  axios.post('/wp/v2/comments' + paramsString).then(function(response) {
    // console.log(response.data);
    switch (response.data.status) {
      case 'hold':
        dispatcher.dispatch({type: 'PENDING_COMMENT'});
        break;
      default:
        dispatcher.dispatch({type: 'APPROVED_COMMENT'});
        PostsActions.fetchPost(response.data.post);
    }

  }).catch(function(error) {
    // console.log(error);
    dispatcher.dispatch({type: 'ERROR_COMMENT', message: error.response.data.message});
  });
}
