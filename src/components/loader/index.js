import React, {Component} from 'react';
import css from '../../lib/css';
import SVG from '../svg';
require('./_loader.sass');

// Stores
import LoaderStore from '../../stores/LoaderStore';

export default class Loader extends Component {
  constructor() {
    super();
    this.setShowLoader = this.setShowLoader.bind(this);
    this.state = {
      displayLoader: true
    };
  }

  componentWillMount() {
    // Add listeners for changes to loading state
    LoaderStore.on('change', this.setShowLoader);
  }

  componentWillUnmount() {
    // Remove listeners for changes to loading state
    LoaderStore.removeListener('change', this.setShowLoader);
  }

  setShowLoader() {
    this.setState({displayLoader: LoaderStore.getLoading()});
  }

  render() {
    var loadingClass;
    
    this.state.displayLoader
      ? loadingClass = css.loading
      : loadingClass = '';

    return (
      <div className={css.loader + loadingClass}>
        <SVG type="spinner"/>
      </div>
    );
  }
}
