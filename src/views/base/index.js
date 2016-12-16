import React, {Component} from 'react';

// Stores & Actions
import * as OptionsActions from '../../actions/OptionsActions';
import OptionsStore from '../../stores/OptionsStore';
// import * as SiteActions from '../../actions/SiteActions';

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
    OptionsActions.fetchOptions();
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

    console.log(this.props.children);

    return (
      <div>
        <Header/>

          {React.cloneElement(this.props.children, {...options})}

        <Footer {...options}/>
        <Loader />
      </div>

    );
  }
}
