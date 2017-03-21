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

export const enquiryComment = (paramsString, messages) => (dispatch) => {
  return dispatch({
    type: types.POST_COMMENT,
    payload: axios.post('/wp/v2/comments' + paramsString),
    meta: {
      messages
    }
  }).catch(error => {})
}

export const postComment = (paramsString, messages) => (dispatch) => {
  return dispatch({
    type: types.POST_COMMENT,
    payload: axios.post('/wp/v2/comments' + paramsString),
    meta: {
      messages
    }
  }).then((response) => dispatch(refreshComments(response.value.data.post))).catch(error => {})
}

export const cacheComment = (uiState) => ({type: types.CACHE_COMMENT, payload: uiState})
export const resetMessages = () => ({type: types.RESET_MESSAGE})
