import dispatcher from '../dispatcher';

export function resetMessages() {
  dispatcher.dispatch({type: 'RESET_MESSAGE'});
}
