import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

import * as SiteActions from '../actions/SiteActions';

class PageStore extends EventEmitter {
  constructor() {
    super();
    this.page = {};
    this.pagesCache = [];
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getPage(slug) {
    if (this.pagesCache[slug]) {
      return this.pagesCache[slug];
    } else {
      SiteActions.fetchPage(slug);
      return false;
    }
  }

  getPageFooterAppend() {
    if (this.page.acf) {
      return this.page.acf.footerAppend;
    } else {
      return false;
    }
  }

  updateCache() {
    // Puts the posts in to an array, indexed by their slug
    if (!this.pagesCache[this.page.slug]) {
      this.pagesCache[this.page.slug] = this.page;
    }
  }

  handleActions(action) {
    switch (action.type) {
      case 'FETCH_PAGE':
        // console.log('PageStore | handleActions | Fetch Page');
        // this.emit('change');
        break;

      case 'RECEIVE_PAGE':
        // console.log('PageStore | handleActions | Receive Page');
        this.page = action.page;
        this.updateCache();
        this.emit('change');
        break;

      default:
    }
  }

}

const pageStore = new PageStore();
export default pageStore;
