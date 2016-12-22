import axios from 'axios';
import dispatcher from '../dispatcher';

import * as PostsActions from '../actions/PostsActions';

export function addComment(paramsString, updateComments) {
  dispatcher.dispatch({type: 'ADDING_COMMENT'});
  axios.post('/wp/v2/comments' + paramsString).then(function(response) {
    switch (response.data.status) {
      case 'hold':
        dispatcher.dispatch({type: 'PENDING_COMMENT'});
        break;
      default:
        dispatcher.dispatch({type: 'APPROVED_COMMENT'});
        // If requested, also update the comments
        updateComments && PostsActions.fetchPost(response.data.post);
    }

  }).catch(function(error) {
    // console.log(error);
    dispatcher.dispatch({type: 'ERROR_COMMENT', message: error.response.data.message});
  });
}

export function cacheState(state) {
  dispatcher.dispatch({type: 'STORE_INPUTS', cachedState: state});
}
