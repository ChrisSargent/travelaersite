import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchPage} from '../../actions/pages'
import {getPage} from '../../reducers/pages'
import Banner from '../../sections/banner'
import Countries from '../../sections/countries'
import Contact from '../../sections/contact'
import Error from '../../components/error'
import Head from '../../components/head'
import Hero from '../../sections/hero'
import ImageBanner from '../../sections/image-banner'
import Gmap from '../../sections/map'
import Mosaic from '../../sections/mosaic'
import Positions from '../../sections/positions'
import ProductModules from '../../sections/product-modules'
import Products from '../../sections/products'
import Team from '../../sections/team'
import TPContentScreenshots from '../../sections/travel-paas/content-screenshots'
import TPFeatures from '../../sections/travel-paas/features'
import Section from '../../sections/section'

class Page extends Component {
  static fetchData(store, props) {
    const {pathname} = props.location
    return store.dispatch(fetchPage(pathname))
  }

  componentDidMount() {
    const {pathname} = this.props.location
    this.props.fetchPage(pathname)
  }

  componentWillReceiveProps(newProps) {
    const prevPathname = this.props.location.pathname;
    const newPathname = newProps.location.pathname
    prevPathname !== newPathname && (this.props.fetchPage(newPathname))
  }

  render() {
    var blocksMap = [],
      travelPaasBlocks = [],
      name = '',
      content = '',
      respSizes = '',
      contSize = '',
      allowFullsize = false,
      mainClass = '',
      meta_image = false

    const {page, hasSubMenu} = this.props
    hasSubMenu && (mainClass = '-hassubmenu')

    if (!page)
      return null

    if (page.invalid)
      return <Error/>

    if (page.acf.contentBlocks) {
      blocksMap = page.acf.contentBlocks.map((block, index) => {

        const {
          acf_fc_layout,
          image,
          skew,
          overlaps,
          background,
          contentImage,
          fullscreen
        } = block

        switch (acf_fc_layout) {
          case 'hero':
            name = 'hero'
            contentImage && (contSize = 'fullwidth')
            content = <Hero {...block} compName={name}/>
            !meta_image && (meta_image = image)
            break

          case 'banner':
            name = 'banner'
            content = <Banner {...block} compName={name}/>
            break

          case 'mosaic':
            name = 'mosaic'
            content = <Mosaic {...block} compName={name}/>
            break

          case 'products':
            name = 'products'
            allowFullsize = true
            respSizes = "(min-width: 840px) 150vw, 1200px"
            content = <Products {...block} compName={name}/>
            break

          case 'team':
            name = 'team'
            content = <Team {...block} compName={name}/>
            break

          case 'product_modules':
            name = 'prodmods'
            content = <ProductModules {...block} compName={name}/>
            break

          case 'image_banner':
            name = 'imagebanner'
            content = <ImageBanner {...block} compName={name}/>
            break

          case 'map':
            name = 'map'
            content = <Gmap {...block} compName={name}/>
            break

          case 'contact_form':
            name = 'contact'
            content = <Contact pageID={page.id} compName={name}/>
            break

          case 'countries':
            name = 'countries'
            content = <Countries {...block} compName={name}/>
            break

          case 'positions':
            name = 'positions'
            content = <Positions {...block} compName={name}/>
            break

          default:
            break
        }
        return (
          <Section key={index} compName={name} fullscreen={fullscreen} image={image} respSizes={respSizes} allowFullsize={allowFullsize} skew={skew} overlaps={overlaps} background={background} contSize={contSize}>
            {content}
          </Section>
        )
      })
    }

    if (page.acf.travelPaasContent) {
      travelPaasBlocks = page.acf.travelPaasContent.map((block, index) => {

        const {acf_fc_layout, skew, overlaps, section_id} = block

        switch (acf_fc_layout) {
          case 'content_screenshots':
            name = 'tpaas -' + section_id
            content = <TPContentScreenshots {...block} compName={name}/>
            break

          case 'features':
            name = 'tpaas -features'
            content = <TPFeatures {...block} compName={name}/>
            break

          default:
            break
        }
        return (
          <Section key={index} compName={name} skew={skew} overlaps={overlaps}>
            {content}
          </Section>
        )
      })
    }

    const {title, slug} = page
    const {page_meta_title, page_meta_description, page_meta_image} = page.acf

    const metainfo = {
      title: page_meta_title || title,
      description: page_meta_description || false,
      image: page_meta_image || meta_image,
    }

    return (
      <main id={slug} className={mainClass}>
        <Head {...metainfo}/>
        {blocksMap}
        {travelPaasBlocks}
      </main>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  page: getPage(state, ownProps.location.pathname)
})

const mapDispatchToProps = (dispatch) => ({
  fetchPage(pathname) {
    dispatch(fetchPage(pathname))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Page)
