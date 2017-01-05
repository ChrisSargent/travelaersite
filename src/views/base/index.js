import React, {Component} from 'react';
import Helmet from "react-helmet";

// Stores & Actions
import * as SiteActions from '../../actions/SiteActions';
import OptionsStore from '../../stores/OptionsStore';

// Components
import Footer from '../../components/footer';
import Header from '../../components/header';
import Loader from '../../components/loader/';

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
    var site;
    const {options} = this.state;
    options && (site = options.t_site_info);

    return (
      <div>
        {options &&
          <Helmet
            htmlAttributes={
              {lang: site.language}
            }
            title={site.description}
            titleTemplate={'%s | ' + site.name}
            meta={
              []
            }
          />
        }
        <Header/>
        {React.cloneElement(this.props.children, {options: options})}
        <Footer {...options}/>
        <Loader/>
      </div>

    );
  }
}
