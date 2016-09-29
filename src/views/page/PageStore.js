import dispatcher from '../../dispatcher';
import {EventEmitter} from 'events';

class PageStore extends EventEmitter {
  constructor() {
    super();
    this.page = [];
    this.fetchingPage = true;
  }

  getPage() {
    // console.log('PageStore | getPage');
    return this.page;
  }

  getPageLoading() {
    return this.fetchingPage;
  }

  getPageFooterAppend() {
    // console.log('PageStore | getPageFooterAppend');
    if(this.page.acf) {
      return this.page.acf.footerAppend;
    } else {
      return false;
    }
  }

  handleActions(action) {
    switch (action.type) {
      case 'FETCH_PAGE':
        {
          // console.log('PageStore | handleActions | Fetch Page');
          this.fetchingPage = true;
          this.emit('change');
          break;
        }
      case 'RECEIVE_PAGE':
        {
          // console.log('PageStore | handleActions | Receive Page');
          this.page = action.page;
          this.fetchingPage = false;
          this.emit('change');
          break;
        }
      default:
        {
          break;
        }
    }
  }

}

const pageStore = new PageStore();
dispatcher.register(pageStore.handleActions.bind(pageStore));

export default pageStore;
