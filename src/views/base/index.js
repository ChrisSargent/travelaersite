import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import Raven from 'raven-js'
import {observableFonts} from '../../lib/css'
import {fetchMenu, fetchOptions} from '../../actions/site'
import FontFaceObserver from 'fontfaceobserver'
import Footer from '../../components/footer'
import Head from '../../components/head'
import Header from '../../components/header'
import Loader from '../../components/loader/'
import SiteSchema from '../../components/site-schema/'
import '../../lib/sass/index.sass'

class Base extends PureComponent {
  componentDidMount() {
    this.observeFonts()
    this.props.fetchMenu('primary')
    this.props.fetchOptions()
  }

  static fetchData(store) {
    return Promise.all([
      store.dispatch(fetchMenu('primary')),
      store.dispatch(fetchOptions())
    ])
  }

  observeFonts() {
    observableFonts.map((font) => {
      const weights = font.weights.map((weight) => {
        return new FontFaceObserver(font.family, {weight: weight});
      })

      const observedWeights = weights.map((weight) => {
        return weight.load(null, 15000)
      })

      Promise.all(observedWeights).then(() => {
        document.body.className += ' ' + font.id
      }, () => {
        Raven.captureMessage(font.family + ' is not available after waiting 15 seconds')
      })

      return null
    })
  }

  render() {
    const {children, location} = this.props

    return (
      <div>
        <Head/>
        <Header/>
        {React.cloneElement(children, {key: location.pathname})}
        <Footer/>
        <Loader/>
        <SiteSchema/>
      </div>
    )
  }
}

const mapDispatchToProps = (dispatch) => ({
  fetchMenu(location) {
    dispatch(fetchMenu(location))
  },
  fetchOptions() {
    dispatch(fetchOptions())
  }
})

export default connect(null, mapDispatchToProps)(Base)
