import React, {Component} from 'react';

// Stores & Actions
import NavStore from '../../stores/NavStore';
import * as OptionsActions from '../../actions/OptionsActions';
import OptionsStore from '../../stores/OptionsStore';
import PageStore from '../../stores/PageStore';
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
    this.setShowLoader = this.setShowLoader.bind(this);
    this.state = {
      options: OptionsStore.getOptions(),
      showLoader: true
    };
  }

  componentWillMount() {
    OptionsActions.fetchOptions();
    SiteActions.fetchSite();
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
    var that = this;
    const getPageLoading = PageStore.getPageLoading();
    const getMenuLoading = NavStore.getMenuLoading();
    const getOptionsLoading = OptionsStore.getOptionsLoading();
    if(getPageLoading || getMenuLoading || getOptionsLoading) {
      this.setState({showLoader: " loading"});
    } else {
      setTimeout(function () {
        that.setState({showLoader: ""});
      }, 0);
    }
  }

  render() {
    const {showLoader, options} = this.state;

    return (
      <div>
        <Header/>

          {this.props.children}

        <Footer {...options}/>
        <Loader loading={showLoader}/>
      </div>

    );
  }
}
