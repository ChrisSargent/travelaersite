import React, {Component} from 'react';
import Helmet from "react-helmet";

// Stores & Actions
import PageStore from '../../stores/PageStore';

// Components
import Banner from '../../components/banner';
import Countries from '../../components/countries';
import Contact from '../../components/contact';
import Hero from '../../components/hero';
import ImageBanner from '../../components/image-banner';
import Gmap from '../../components/map';
import Mosaic from '../../components/mosaic';
import Positions from '../../components/positions';
import ProductModules from '../../components/product-modules';
import Products from '../../components/products';
import Team from '../../components/team';
import Section from '../../components/section';

export default class Page extends Component {
  constructor(props) {
    super(props);
    this.requestPage = this.requestPage.bind(this);
    this.getRequestedSlug = this.getRequestedSlug.bind(this);
    this.state = {};
  }

  componentWillMount() {
    this.requestPage();
    PageStore.on('change', this.requestPage);
  }

  componentWillReceiveProps(newProps) {
    if (this.props.location.pathname !== newProps.location.pathname) {
      this.requestPage(newProps);
    }
  }

  componentWillUnmount() {
    PageStore.removeListener('change', this.requestPage);
  }

  requestPage(props) {
    props = props || this.props;
    const slug = this.getRequestedSlug(props.location.pathname);
    const page = PageStore.getPage(slug);
    page && (this.setState({page: page}));
  }

  getRequestedSlug(path) {
    const pathArray = path.split('/');
    var slug = pathArray[pathArray.length - 1];
    slug === '' && (slug = 'home');
    return slug;
  }

  render() {
    const {page} = this.state;
    const {options} = this.props;

    if (!page)
      return null;

    // Get all the content blocks and map them to a variable
    const blocksMap = page.acf.contentBlocks.map((block, index) => {
      var name,
        content,
        respSizes,
        contSize;
      const {acf_fc_layout, image, skew, overlaps, background, contentImage} = block;

      switch (acf_fc_layout) {
        case 'hero':
          name = 'hero';
          content = <Hero {...block} compName={name}/>;
          contentImage && (contSize = 'fullwidth');
          break;

        case 'banner':
          name = 'banner';
          content = <Banner {...block} compName={name}/>;
          break;

        case 'mosaic':
          name = 'mosaic';
          content = <Mosaic tiles={block.tiles} compName={name}/>;
          break;

        case 'products':
          name = 'products';
          respSizes = "(min-width: 840px) 150vw, 100vw"
          content = <Products {...block} compName={name}/>;
          break;

        case 'team':
          name = 'team';
          content = <Team {...block} compName={name}/>;
          break;

        case 'product_modules':
          name = 'prodmods';
          content = <ProductModules {...block} compName={name}/>
          break;

        case 'image_banner':
          name = 'imagebanner';
          content = <ImageBanner {...block} compName={name}/>
          break;

        case 'map':
          name = 'map';
          content = <Gmap {...block} compName={name} options={options}/>
          break;

        case 'contact_form':
          name = 'contact';
          content = <Contact pageID={page.id} compName={name} options={options}/>
          break;

        case 'countries':
          name = 'countries';
          content = <Countries {...block} compName={name}/>
          break;

        case 'positions':
          name = 'positions';
          content = <Positions {...block} compName={name}/>
          break;

        default:
      }
      return (
        <Section key={index} compName={name} image={image} respSizes={respSizes} skew={skew} overlaps={overlaps} background={background} contSize={contSize}>
          {content}
        </Section>
      )
    })

    return (
      <main id={page.slug}>
        <Helmet title={page.title.rendered}/> {blocksMap}
      </main>
    );
  }
}
