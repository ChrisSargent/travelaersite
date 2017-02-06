import React, {Component} from 'react'
import Helmet from "react-helmet"
import {connect} from 'react-redux'
import {fetchPage} from '../../actions/pages'
import {getPage} from '../../reducers/pages'
import Banner from '../../sections/banner'
import Countries from '../../sections/countries'
import Contact from '../../sections/contact'
import Hero from '../../sections/hero'
import ImageBanner from '../../sections/image-banner'
import Gmap from '../../sections/map'
import Mosaic from '../../sections/mosaic'
import Positions from '../../sections/positions'
import ProductModules from '../../sections/product-modules'
import Products from '../../sections/products'
import Team from '../../sections/team'
import TPArchitecture from '../../sections/travel-paas/architecture'
import TPContentScreenshots from '../../sections/travel-paas/content-screenshots'
import TPFeatures from '../../sections/travel-paas/features'
import Section from '../../sections/section'

class Page extends Component {
  componentDidMount() {
    const {pathname} = this.props.location
    this.props.fetchPage(pathname)
  }

  componentWillReceiveProps(newProps) {
    const currentPathname = this.props.location.pathname
    const newPathname = newProps.location.pathname
    currentPathname !== newPathname && (this.props.fetchPage(newPathname))
  }

  render() {
    const {page} = this.props

    console.log(page);

    if (!page)
      return null

    if (page.acf.contentBlocks) {
      var blocksMap = page.acf.contentBlocks.map((block, index) => {
        var name,
          content,
          respSizes,
          contSize,
          allowFullsize
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
            content = <Hero {...block} compName={name}/>
            contentImage && (contSize = 'fullwidth')
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
      var travelPaasBlocks = page.acf.travelPaasContent.map((block, index) => {
        var name,
          content
        const {acf_fc_layout, skew, overlaps, section_id} = block

        switch (acf_fc_layout) {
          case 'architecture':
            name = 'tpaas -architecture'
            content = <TPArchitecture {...block} compName={name}/>
            break

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

    return (
      <main id={page.slug}>
        <Helmet title={page.title.rendered}/> {blocksMap}
        {travelPaasBlocks}
      </main>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  page: getPage(state, ownProps.location.pathname),
})

const mapDispatchToProps = (dispatch) => ({
  fetchPage(pathname) {
    dispatch(fetchPage(pathname))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Page)
