import React, {Component} from 'react';
import css from '../../lib/css';
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
      loadingClass: ''
    };
    // Keep stores that more regularly change near the front
    this.stores = [PageStore, PostsStore, TeamStore, NavStore, OptionsStore]
  }

  componentWillMount() {
    // Add listeners for changes to loading state
    this.stores.map((store, index) => {
      return store.on('change', this.setShowLoader);
    });
  }

  componentWillUnmount() {
    // Remove listeners for changes to loading state
    this.stores.map((store, index) => {
      return store.removeListener('change', this.setShowLoader);
    });
  }

  setShowLoader() {
    var isLoading = true;

    for(var i = 0; i < this.stores.length; i++) {
      if(this.stores[i].getLoading()){
        isLoading = true;
        break;
      } else {
        isLoading = false;
      }
    }

    if (isLoading) {
      this.setState({loadingClass: css.loading});
    } else {
      this.setState({loadingClass: ''});
    }
  }

  render() {
    const {loadingClass} = this.state;

    return (
      <div className={css.loader + loadingClass}>
        <Icon type="spinner" />
      </div>
    );
  }
}
