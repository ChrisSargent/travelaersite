import React, {Component} from 'react';
import Wysiwyg from '../../components/wysiwyg';

// Stores & Actions
import * as PageActions from '../../actions/PageActions';
import PageStore from '../../stores/PageStore';

// Components
import Blocks from '../../components/blocks';

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
        return <Blocks key={index} {...block}/>;
      });
    } else {
      blocksMap = false;
    }

    if (page.slug === 'home') {
      // If we're on the home page we don't use the title or content
      page.title = false;
      page.content = false;
    }

    return (
      <main id={page.slug} className={page.slug}>
        {page.title && <h1>{page.title.rendered}</h1>}
        {page.content && <Wysiwyg content={page.content} />}
        {blocksMap}
      </main>
    );
  }
}
