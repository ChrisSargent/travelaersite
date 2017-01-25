import React from 'react';
import {connect} from 'react-redux'
import css from '../../lib/css';
import SVG from '../svg';
import './_loader.sass';

const Loader = (props) => {
  var loadingClass;

  props.displayLoader
    ? loadingClass = css.loading
    : loadingClass = '';

  return (
    <div className={css.loader + loadingClass}>
      <SVG type="spinner"/>
    </div>
  );
}

const mapStateToProps = (state) => {
  var displayLoader
  state.loading.length
    ? displayLoader = true
    : displayLoader = false

  return {displayLoader: displayLoader}
}

export default connect(mapStateToProps)(Loader)
