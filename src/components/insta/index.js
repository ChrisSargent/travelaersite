import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchInsta} from '../../actions/insta'
import {getOptions} from '../../reducers/site'
import {getInsta} from '../../reducers/insta'
import css from '../../lib/css'
import RespImageCover from '../resp-image-cover'
import SVG from '../svg'
import './_insta.sass'

class Insta extends Component {
  componentDidMount() {
    const {instAuthToken, instUserNameID} = this.props
    if (instAuthToken && instUserNameID) {
      this.props.dispatch(fetchInsta(this.props))
    }
  }

  imageAdaptor(images) {
    var image = {}
    image.sizes = {
      'large': images.standard_resolution.url,
      'large-width': images.standard_resolution.width,
      'large-height': images.standard_resolution.height,
      'medium': images.low_resolution.url,
      'medium-width': images.low_resolution.width,
      'medium-height': images.low_resolution.height,
      'thumbnail': images.thumbnail.url,
      'thumbnail-width': images.thumbnail.width,
      'thumbnail-height': images.thumbnail.height
    }
    return image
  }

  render() {
    const {feed} = this.props

    if (!feed)
      return null

    const compName = 'insta'
    const instaMap = feed.map((item) => {
      var image = this.imageAdaptor(item.images)

      item.caption
        ? image.alt = item.caption.text
        : image.alt = 'An instagram image by #' + item.user.username

      return (
        <li key={item.id} className={css.item}>
          <a href={item.link} target="_blank" className={css.link + compName}>
            <SVG type="instagram"/>
            <RespImageCover image={image}/>
          </a>
        </li>
      )
    })

    return (
      <ul className={css.list + compName}>
        {instaMap}
      </ul>
    )
  }
}

const mapStateToProps = (state) => {
  const {instAuthToken, instUserName, instUserNameID} = getOptions(state)
  const feed = getInsta(state)
  return ({instAuthToken, instUserName, instUserNameID, feed})
}

export default connect(mapStateToProps)(Insta)
