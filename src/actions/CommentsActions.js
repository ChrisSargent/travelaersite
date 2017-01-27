import axios from 'axios'
import types from '.'

export const refreshComments = (postID) => {
  const params = {
    fields: 'id,slug,t_comments_info'
  }
  return {
    type: types.REFRESH_COMMENTS,
    payload: axios.get('/wp/v2/posts/' + postID, {params})
  }
}

export const postComment = (paramsString, updateComments) => (dispatch) => {
  return updateComments
    ? dispatch({
      type: types.POST_COMMENT,
      payload: axios.post('/wp/v2/comments' + paramsString)
    }).then((response) => dispatch(refreshComments(response.value.data.post)))
    : dispatch({
      type: types.POST_COMMENT,
      payload: axios.post('/wp/v2/comments' + paramsString)
    })
}

export const cacheComment = (uiState) => ({type: types.CACHE_COMMENT, payload: uiState})
export const resetMessages = () => ({type: types.RESET_MESSAGE})
