import React, {Component} from 'react';

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
    var blocksMap;
    if (this.state.page.length === 0) {
      // If we haven't got the page from the API yet, return as fast as possible
      return false;
    }

    const page = this.state.page;

    if (page.acf) {
      blocksMap = page.acf.contentBlocks.map((blockProps, index) => {
        return <Blocks key={index} {...blockProps}/>;
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
      <main key={page.id} id={page.slug} className={page.slug}>
        {page.title ? <h1>{page.title.rendered}</h1> : false}
        {page.content ? <div className="content--wysiwyg" dangerouslySetInnerHTML={{__html: page.content.rendered}}></div> : false}
        {blocksMap}
      </main>
    );
  }
}
