import dispatcher from '../dispatcher';
import {EventEmitter} from 'events';

import * as PageActions from '../actions/PageActions';

class PageStore extends EventEmitter {
  constructor() {
    super();
    this.pages = [];
    this.cache = [];
    this.fetchingPage = false;
    this.dispatchToken = dispatcher.register(this.handleActions.bind(this));
  }

  getPage(slug) {
    slug = slug || 'home';
    // console.log('PageStore | getPage');
    // If looking for a single post, check the cache and return the post from the cache
    if (this.cache[slug]) {
      return this.cache[slug];
    }
    // Else do a WP call for the page
    PageActions.fetchPage(slug);
    return this.pages;
  }

  getLoading() {
    return this.fetchingPage;
  }

  getPageFooterAppend() {
    // console.log('PageStore | getPageFooterAppend');
    // if (this.pages.acf) {
    //   return this.pages.acf.footerAppend;
    // } else {
    //   return false;
    // }
    return false;
  }

  updateCache() {
    // Puts the posts in to an array, indexed by their slug
    for (var i = 0; i < this.pages.length; i++) {
      var page = this.pages[i];
      if (!this.cache[page.slug]) {
        this.cache[page.slug] = page;
      }
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
        this.pages = action.pages;
        this.updateCache();
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
