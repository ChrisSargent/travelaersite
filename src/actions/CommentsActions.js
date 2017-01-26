import axios from 'axios'

export const postComment = (paramsString, updateComments) => ({
  type: 'POST_COMMENT',
  payload: axios.post('/wp/v2/comments' + paramsString)
})

// TODO: updateComments && PostsActions.fetchPost(response.data.post)

export const cacheComment = (uiState) => ({type: 'COMMENT_CACHE', payload: uiState})
export const resetMessages = () => ({type: 'RESET_MESSAGE'})
