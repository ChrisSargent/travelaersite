import axios from 'axios'
import dispatcher from '../dispatcher'
import store from '../store'

export function cacheState(state) {
  dispatcher.dispatch({type: 'STORE_INPUTS', cachedState: state})
}

export const postComment = (paramsString, updateComments) => {
  return {
    type: 'POST_COMMENT',
    payload: axios.post('/wp/v2/comments' + paramsString)
  }
}

export const resetMessages = () => {
  store.dispatch({type: 'RESET_MESSAGE'})
}
