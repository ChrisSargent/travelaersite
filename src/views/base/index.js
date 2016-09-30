import React, {Component} from 'react';

// Stores & Actions
import NavStore from '../../stores/NavStore';
import * as OptionsActions from '../../actions/OptionsActions';
import OptionsStore from '../../stores/OptionsStore';
import PageStore from '../../stores/PageStore';

// Components
import Footer from '../../components/footer';
import Header from '../../components/header';
import Loader from '../../components/loader/';

export default class Base extends Component {
  constructor() {
    super();
    this.requestOptions = this.requestOptions.bind(this);
    this.setShowLoader = this.setShowLoader.bind(this);
    this.state = {
      options: OptionsStore.getOptions(),
      showLoader: true
    };
  }

  componentWillMount() {
    OptionsActions.fetchOptions();
    NavStore.on('change', this.setShowLoader);
    OptionsStore.on('change', this.requestOptions);
    PageStore.on('change', this.setShowLoader);
  }

  componentWillUnmount() {
    NavStore.removeListener('change', this.setShowLoader);
    OptionsStore.removeListener('change', this.requestOptions);
    PageStore.removeListener('change', this.setShowLoader);
  }

  requestOptions() {
    // console.log('Base | requestOptions');
    this.setState({options: OptionsStore.getOptions()});
    this.setShowLoader();
  }

  setShowLoader() {
    const getPageLoading = PageStore.getPageLoading();
    const getMenuLoading = NavStore.getMenuLoading();
    const getOptionsLoading = OptionsStore.getOptionsLoading();
    if(getPageLoading || getMenuLoading || getOptionsLoading) {
      this.setState({showLoader: true});
    } else {
      this.setState({showLoader: false});
    }
  }

  render() {
    const {showLoader, options} = this.state;

    return (
      <div>
        <Header/>

          {this.props.children}

        <Footer {...options}/>
        {showLoader ? <Loader /> : false}
      </div>

    );
  }
}
