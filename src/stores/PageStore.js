import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

class PageStore extends EventEmitter {
  constructor() {
    super();
    this.page = [];
    this.fetchingPage = false;
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getPage() {
    // console.log('PageStore | getPage');
    return this.page;
  }

  getLoading() {
    return this.fetchingPage;
  }

  getPageFooterAppend() {
    // console.log('PageStore | getPageFooterAppend');
    if (this.page.acf) {
      return this.page.acf.footerAppend;
    } else {
      return false;
    }
  }

  handleActions(action) {
    var self = this; // To use in the timeout
    switch (action.type) {
      case 'FETCH_PAGE':
        // console.log('PageStore | handleActions | Fetch Page');
        this.fetchingPage = true;
        this.emit('change');
        break;

      case 'RECEIVE_PAGE':
        // console.log('PageStore | handleActions | Receive Page');
        this.page = action.page[0];
        this.fetchingPage = false;
        // TODO: Find a way to take this out of the timeout
        // Needs to be in a setTimeout to prevent error: Invariant Violation: Dispatch.dispatch(...): Cannot dispatch in the middle of a dispatch.
        // Tried for several hours using dispatcher.waitFor but no dice
        setTimeout(function() {
          self.emit('change');
        });
        break;

      default:
    }
  }

}

const pageStore = new PageStore();
export default pageStore;
