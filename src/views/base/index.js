import React, {Component} from 'react';

// Stores & Actions
import * as OptionsActions from '../../actions/OptionsActions';
import OptionsStore from '../../stores/OptionsStore';
import * as SiteActions from '../../actions/SiteActions';

// Components
import Footer from '../../components/footer';
import Header from '../../components/header';
import Loader from '../../components/loader/';

// Library
import '../../lib/sass/index.sass'

export default class Base extends Component {
  constructor() {
    super();
    this.requestOptions = this.requestOptions.bind(this);
    this.state = {
      options: OptionsStore.getOptions(),
    };
  }

  componentWillMount() {
    OptionsActions.fetchOptions();
    SiteActions.fetchSite();
    OptionsStore.on('change', this.requestOptions);
  }

  componentWillUnmount() {
    OptionsStore.removeListener('change', this.requestOptions);
  }

  requestOptions() {
    this.setState({options: OptionsStore.getOptions()});
  }

  render() {
    const {options} = this.state;

    return (
      <div>
        <Header/>

          {this.props.children}

        <Footer {...options}/>
        <Loader />
      </div>

    );
  }
}
