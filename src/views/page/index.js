import React, {Component} from 'react';

// Stores & Actions
import PageStore from '../../stores/PageStore';

// Components
import Banner from '../../components/banner';
import Hero from '../../components/hero';
import ImageBanner from '../../components/image-banner';
import Mosaic from '../../components/mosaic';
import ProductModules from '../../components/product-modules';
import Products from '../../components/products';
import Team from '../../components/team';

export default class Page extends Component {
  constructor() {
    super();
    this.requestPage = this.requestPage.bind(this);
    this.state = {};
  }

  componentWillMount() {
    this.requestPage();
    PageStore.on('change', this.requestPage);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.params.slug !== newProps.params.slug) {
      const page = PageStore.getPage(newProps.params.slug);
      page && (this.setState({page: page}));
    }
  }

  componentWillUnmount() {
    PageStore.removeListener('change', this.requestPage);
  }

  requestPage() {
    const page = PageStore.getPage(this.props.params.slug);
    page && (this.setState({page: page}));
  }

  render() {
    const page = this.state.page;

    if (!page)
      return null;

    // Get all the content blocks and map them to a variable
    const blocksMap = page.acf.contentBlocks.map((block, index) => {
      switch (block.acf_fc_layout) {
        case 'hero':
          return <Hero key={index} {...block}/>;

        case 'banner':
          return <Banner key={index} {...block}/>;

        case 'mosaic':
          return <Mosaic key={index} tiles={block.tiles}/>;

        case 'products':
          return <Products key={index} {...block}/>;

        case 'team':
          return <Team key={index} {...block}/>;

        case 'product_modules':
          return <ProductModules key={index} {...block}/>

        case 'image_banner':
          return <ImageBanner key={index} {...block}/>

        default:
          return false;
      }
    })

    return (
      <main id={page.slug}>
        {blocksMap}
      </main>
    );
  }
}
