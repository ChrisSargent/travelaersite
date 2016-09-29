import React, {Component} from 'react';

import * as PageActions from './PageActions';
import PageStore from './PageStore';
import Section from '../../components/section';

export default class Products extends Component {
  constructor(props) {
    super();
    this.requestPage = this.requestPage.bind(this);
    this.state = {
      page: PageStore.getPage(),
      pageID: props.route.pageID
    };
  }

  componentWillMount() {
    const {pageID} = this.props.route;
    PageActions.fetchPage(pageID);
    PageStore.on('change', this.requestPage);
  }

  componentWillReceiveProps(props) {
    const {pageID} = props.route;
    PageActions.fetchPage(pageID);
  }

  componentWillUnmount() {
    PageStore.removeListener('change', this.requestPage);
  }

  requestPage() {
    this.setState({page: PageStore.getPage()});
  }

  render() {
    var sections;
    const {page} = this.state;

    if(page.acf) {
      sections = page.acf.contentBlocks.map((sectionProps, index) => {
        return <Section key={index} {...sectionProps}/>;
      });
    } else {
      sections = false;
    }

    return (
      <main key={page.id} id={page.slug} className={page.slug}>
        {sections}
      </main>
    );
  }
}
