import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

class LoaderStore extends EventEmitter {
  constructor() {
    super();
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
    this.addToLoadingArray = this.addToLoadingArray.bind(this);
    this.removeFromLoadingArray = this.removeFromLoadingArray.bind(this);
    this.loadingArray = [];
  }

  addToLoadingArray(id) {
    this.loadingArray.push(id);
    // console.log(this.loadingArray);
  }

  removeFromLoadingArray(id) {
    this.loadingArray.splice(id, 1);
    // console.log(this.loadingArray);
  }

  getLoading() {
    return this.loadingArray.length > 0
      ? true
      : false;
  }

  handleActions(action) {
    switch (action.type) {
      case 'LOADING':
        // console.log('LoaderStore | handleActions | Loading');
        this.addToLoadingArray(action.id);
        this.emit('change');
        break;

      case 'FINISHED_LOADING':
        // console.log('LoaderStore | handleActions | Finished');
        this.removeFromLoadingArray(action.id);
        this.emit('change');
        break;

      default:
    }
  }
}

const loaderStore = new LoaderStore();
export default loaderStore;
