import axios from 'axios'

export const postComment = (paramsString, updateComments) => {
  return {
    type: 'POST_COMMENT',
    payload: axios.post('/wp/v2/comments' + paramsString)
  }
}

export const cacheComment = (state) => {
  return {type: 'COMMENT_CACHE', payload: state}
}

export const resetMessages = () => {
  return {type: 'RESET_MESSAGE'}
}
