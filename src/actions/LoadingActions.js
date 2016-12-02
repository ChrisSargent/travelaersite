import dispatcher from '../dispatcher';

/*
 * Using this Loading actions file for components that don't have real actions
 * of their own, they just need to tell the loader wheter they're loading or not
*/

export function loading(id) {
  dispatcher.dispatch({type: 'LOADING', id: 'loading' + id});
}

export function finished(id) {
  dispatcher.dispatch({type: 'FINISHED_LOADING', id: 'loading' + id});
}
