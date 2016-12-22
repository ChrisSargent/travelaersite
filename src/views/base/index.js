import React, {Component} from 'react';

// Stores & Actions
import * as SiteActions from '../../actions/SiteActions';
import OptionsStore from '../../stores/OptionsStore';

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
    this.state = {};
  }

  componentWillMount() {
    SiteActions.fetchOptions();
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

          {React.cloneElement(this.props.children, {options: options})}

        <Footer {...options}/>
        <Loader />
      </div>

    );
  }
}
