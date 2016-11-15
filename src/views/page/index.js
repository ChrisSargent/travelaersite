import React, {Component} from 'react';

// Stores & Actions
import * as PageActions from '../../actions/PageActions';
import PageStore from '../../stores/PageStore';

// Components
import Banner from '../../components/banner';
import Hero from '../../components/hero';
import Mosaic from '../../components/mosaic';
import Section from '../../components/section';
import Team from '../../components/team';

export default class Page extends Component {
  constructor() {
    super();
    this.requestPage = this.requestPage.bind(this);
    this.state = {
      page: PageStore.getPage()
    };
  }

  componentWillMount() {
    PageActions.fetchPage(this.props.params.slug);
    PageStore.on('change', this.requestPage);
  }

  componentWillReceiveProps(props) {
    // // If the requested slug doesn't match the current slug, fetches the new page which will trigger a new requestPage being fired by the call backs
    // const slug = this.filterSlug(props.params.slug);
    if (this.props.params.slug !== props.params.slug) {
      PageActions.fetchPage(props.params.slug);
    }
  }

  componentWillUnmount() {
    PageStore.removeListener('change', this.requestPage);
  }

  requestPage() {
    this.setState({page: PageStore.getPage()});
  }

  render() {
    var blocksMap;
    if (this.state.page.length === 0) {
      // If we haven't got the page from the API yet, return as fast as possible
      return false;
    }

    const page = this.state.page;

    if (page.acf) {
      // Get all the content blocks and map them to a variable
      blocksMap = page.acf.contentBlocks.map((block, index) => {
        switch (block.acf_fc_layout) {
          case 'hero':
            return <Hero key={index} {...block}/>;

          case 'banner':
            return <Banner key={index} {...block}/>;

          case 'mosaic':
            return <Mosaic key={index} {...block}/>;

          case 'section':
            return <Section key={index} {...block}/>;

          case 'team':
            return <Team key={index} {...block}/>;

          default:
            return false;
        }
      });
    } else {
      blocksMap = false;
    }

    return (
      <main id={page.slug} className={page.slug}>
        {blocksMap}
      </main>
    );
  }
}
