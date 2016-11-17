import React, {Component} from 'react';
require('./_loader.sass');

// Stores
import NavStore from '../../stores/NavStore';
import OptionsStore from '../../stores/OptionsStore';
import PageStore from '../../stores/PageStore';
import PostsStore from '../../stores/PostsStore';
import TeamStore from '../../stores/TeamStore';

export default class Loader extends Component {
  constructor() {
    super();
    this.setShowLoader = this.setShowLoader.bind(this);
    this.state = {
      loaderClass: 'loader'
    };
  }

  componentWillMount() {
    // Add listeners for changes to loading state
    OptionsStore.on('change', this.setShowLoader);
    NavStore.on('change', this.setShowLoader);
    PageStore.on('change', this.setShowLoader);
    PostsStore.on('change', this.setShowLoader);
    TeamStore.on('change', this.setShowLoader);
  }

  componentWillUnmount() {
    // Remove listeners for changes to loading state
    OptionsStore.removeListener('change', this.setShowLoader);
    NavStore.removeListener('change', this.setShowLoader);
    PageStore.removeListener('change', this.setShowLoader);
    PostsStore.removeListener('change', this.setShowLoader);
    PostsStore.removeListener('change', this.setShowLoader);
  }

  setShowLoader() {
    var self = this;
    var getPageLoading = PageStore.getPageLoading();
    var getMenuLoading = NavStore.getMenuLoading();
    var getOptionsLoading = OptionsStore.getOptionsLoading();
    var getPostsLoading = PostsStore.getPostsLoading();
    var getTeamLoading = TeamStore.getTeamLoading();
    if(getPageLoading || getMenuLoading || getOptionsLoading || getPostsLoading || getTeamLoading) {
      this.setState({loaderClass: 'loader -loading'});
    } else {
      setTimeout(function () {
        self.setState({loaderClass: 'loader'});
      }, 0);
    }
  }

  render() {
    const {loaderClass} = this.state;

    return (
      <div className={loaderClass}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80">
          <g fill="none" fillRule="evenodd">
            <path id="fans" fill="#fff" d="M31.2 31.2L17 17c2.4-2.4 5.1-4.4 8.2-5.9C30 15.9 33.7 21.7 36 28.2c-1.8.6-3.5 1.6-4.8 3zm17.6 17.6L63 63c-2.4 2.4-5.1 4.4-8.2 5.9C50 64.1 46.3 58.3 44 51.8c1.8-.6 3.5-1.6 4.8-3zm-20.9-12L8.6 31.6c.9-3.3 2.3-6.4 4.1-9.2 6.6 1.8 12.7 5 17.9 9.4-1.2 1.4-2.2 3.1-2.7 5zm24.2 6.4l19.3 5.2c-.9 3.3-2.3 6.4-4.1 9.2-6.6-1.8-12.7-5-17.9-9.4 1.2-1.4 2.2-3.1 2.7-5zm-20.9 5.6L17 63c-2.4-2.4-4.4-5.1-5.9-8.2C15.9 50 21.7 46.3 28.2 44c.6 1.8 1.6 3.5 3 4.8zm17.6-17.6L63 17c2.4 2.4 4.4 5.1 5.9 8.2C64.1 30 58.3 33.7 51.8 36c-.6-1.8-1.6-3.5-3-4.8zm-12 20.9l-5.2 19.3c-3.3-.9-6.4-2.3-9.2-4.1 1.8-6.6 5-12.7 9.4-17.9 1.4 1.2 3.1 2.2 5 2.7zm6.4-24.2l5.2-19.3c3.3.9 6.4 2.3 9.2 4.1-1.8 6.6-5 12.7-9.4 17.9-1.4-1.2-3.1-2.2-5-2.7zm0 24.2l5.2 19.3c-3.3.9-6.7 1.2-10.1 1-1.8-6.6-2-13.5-.8-20.2 1.9.4 3.8.4 5.7-.1zm-6.4-24.2L31.6 8.6c3.3-.9 6.7-1.2 10.1-1 1.8 6.6 2 13.5.8 20.2-1.9-.4-3.8-.4-5.7.1zm-8.9 15.3L8.6 48.4c-.9-3.3-1.2-6.7-1-10.1 6.6-1.8 13.5-2 20.2-.8-.4 1.9-.4 3.8.1 5.7zm24.2-6.4l19.3-5.2c.9 3.3 1.2 6.7 1 10.1-6.6 1.8-13.5 2-20.2.8.4-1.9.4-3.8-.1-5.7z"/>
            <path fill="#fff" d="M40 0C17.8667 0 0 17.8667 0 40s17.8667 40 40 40 40-17.8667 40-40S62.1333 0 40 0zm0 73.1707C21.6898 73.1707 6.8293 58.3102 6.8293 40 6.8293 21.6898 21.6898 6.8293 40 6.8293c18.3102 0 33.1707 14.8605 33.1707 33.1707 0 18.3102-14.8605 33.1707-33.1707 33.1707z"/>
            <path fill="#fff" d="M40 51c6.075 0 11-4.925 11-11s-4.925-11-11-11-11 4.925-11 11 4.925 11 11 11zm0-10c.5523 0 1-.4477 1-1s-.4477-1-1-1-1 .4477-1 1 .4477 1 1 1z"/>
          </g>
        </svg>
      </div>
    );
  }
}
