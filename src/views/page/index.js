import React, {Component} from 'react';

// Stores & Actions
import * as PageActions from '../../actions/PageActions';
import PageStore from '../../stores/PageStore';

// Components
import Section from '../../components/section';

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
    // fetches the new page which will trigger a new requestPage being fired by the call backs
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
    var sectionMap;
    if (this.state.page.length === 0) {
      return false;
    }

    const page = this.state.page[0];

    if (page.acf) {
      sectionMap = page.acf.contentBlocks.map((sectionProps, index) => {
        return <Section key={index} {...sectionProps}/>;
      });
    } else {
      sectionMap = false;
    }

    return (
      <main key={page.id} id={page.slug} className={page.slug}>
        {page.title.rendered}
        {sectionMap}
      </main>
    );
  }
}
