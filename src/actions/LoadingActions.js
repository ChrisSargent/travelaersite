import dispatcher from '../dispatcher';

/*
 * Using this Loading actions file for components that don't have real actions
 * of their own, they just need to tell the loader wheter they're loading or not
*/

export function loading(id) {
  dispatcher.dispatch({type: 'LOADER', loading: true, id: 'loading_' + id});
  // console.log('Loading:' + id);
}

export function finished(id) {
  dispatcher.dispatch({type: 'LOADER', loading: false, id: 'loading_' + id});
  // console.log('Finished:' + id);
}
