import React, {Component} from 'react';
import css from '../../lib/css';
import SVG from '../svg';
import './_loader.sass';

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
    const self = this;
    LoaderStore.getLoading()
      ? this.setState({displayLoader: LoaderStore.getLoading()})
      : setTimeout(function () {
        self.setState({displayLoader: LoaderStore.getLoading()});
      }, 250);
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
