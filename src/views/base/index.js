import React, {Component} from 'react';

// Stores & Actions
import NavStore from '../../stores/NavStore';
import * as OptionsActions from '../../actions/OptionsActions';
import OptionsStore from '../../stores/OptionsStore';
import PageStore from '../../stores/PageStore';
import PostsStore from '../../stores/PostsStore';
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
    OptionsStore.on('change', this.requestOptions);
    // Add listeners for changes to loading state
    NavStore.on('change', this.setShowLoader);
    PageStore.on('change', this.setShowLoader);
    PostsStore.on('change', this.setShowLoader);
  }

  componentWillUnmount() {
    OptionsStore.removeListener('change', this.requestOptions);
    // Remove listeners for changes to loading state
    NavStore.removeListener('change', this.setShowLoader);
    PageStore.removeListener('change', this.setShowLoader);
    PostsStore.removeListener('change', this.setShowLoader);
  }

  requestOptions() {
    // console.log('Base | requestOptions');
    this.setState({options: OptionsStore.getOptions()});
    this.setShowLoader();
  }

  setShowLoader() {
    var self = this;
    var getPageLoading = PageStore.getPageLoading();
    var getMenuLoading = NavStore.getMenuLoading();
    var getOptionsLoading = OptionsStore.getOptionsLoading();
    var getPostsLoading = PostsStore.getPostsLoading();
    if(getPageLoading || getMenuLoading || getOptionsLoading || getPostsLoading) {
      this.setState({showLoader: ' loading'});
    } else {
      setTimeout(function () {
        self.setState({showLoader: ''});
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
