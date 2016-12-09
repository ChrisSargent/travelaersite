import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

import * as PageActions from '../actions/PageActions';

class PageStore extends EventEmitter {
  constructor() {
    super();
    this.page = {};
    this.pagesCache = [];
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getPage(slug) {
    slug = slug || 'home';
    if (this.pagesCache[slug]) {
      return this.pagesCache[slug];
    } else {
      PageActions.fetchPage(slug);
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
    var self = this; // To use in the timeout
    switch (action.type) {
      case 'FETCH_PAGE':
        // console.log('PageStore | handleActions | Fetch Page');
        // this.emit('change');
        break;

      case 'RECEIVE_PAGE':
        // console.log('PageStore | handleActions | Receive Page');
        this.page = action.page;
        this.updateCache();
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
