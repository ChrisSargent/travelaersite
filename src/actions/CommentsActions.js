import axios from 'axios'

export const refreshComments = (postID) => {
  const params = {
    fields: 'id,slug,t_comments_info'
  }
  return {
    type: 'REFRESH_COMMENTS',
    payload: axios.get('/wp/v2/posts/' + postID, {params})
  }
}

export const postComment = (paramsString, updateComments) => (dispatch) => {
  return updateComments
    ? dispatch({
      type: 'POST_COMMENT',
      payload: axios.post('/wp/v2/comments' + paramsString)
    }).then((response) => dispatch(refreshComments(response.value.data.post)))
    : dispatch({
      type: 'POST_COMMENT',
      payload: axios.post('/wp/v2/comments' + paramsString)
    })
}

// TODO: updateComments && PostsActions.fetchPost(response.data.post)

export const cacheComment = (uiState) => ({type: 'COMMENT_CACHE', payload: uiState})
export const resetMessages = () => ({type: 'RESET_MESSAGE'})
