import React, {Component} from 'react';
import Icon from '../icons';
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
    var getPageLoading = PageStore.getPageLoading();
    var getMenuLoading = NavStore.getMenuLoading();
    var getOptionsLoading = OptionsStore.getOptionsLoading();
    var getPostsLoading = PostsStore.getPostsLoading();
    var getTeamLoading = TeamStore.getTeamLoading();
    if(getPageLoading || getMenuLoading || getOptionsLoading || getPostsLoading || getTeamLoading) {
      this.setState({loaderClass: 'loader -loading'});
    } else {
      this.setState({loaderClass: 'loader'});
    }
  }

  render() {
    const {loaderClass} = this.state;

    return (
      <div className={loaderClass}>
        <Icon type="spinner" title="Loading..." />
      </div>
    );
  }
}
