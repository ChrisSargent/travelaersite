import React, {PureComponent} from 'react'
import Gif from 'react-gif'
import css from '../../lib/css'
import RespImage from '../resp-image'
import './_screenshots.sass'


class ScreenShots extends PureComponent {
    constructor(props) {
      super(props)
      this.compName = 'screenshot'
      this.state = {
        activeIndex: props.activeIndex
      }
      this.screenshotsMap = []
      this.createScreenshotsMap = this.createScreenshotsMap.bind(this)
      this.createScreenshotsMap()
    }

    componentWillReceiveProps(newProps) {
      console.log(newProps);
      this.setState({activeIndex: newProps.activeIndex})
    }

    createScreenshotsMap() {
      const {screenshots} = this.props
      const {activeIndex} = this.state
      this.screenshotsMap = screenshots.map((screenshot, index) => {
        var imageMap,
          screenStyles

        // If we only get one image per 'screenshot', just put it in to an array so we can handle it the same
        const images = screenshot.images || [screenshot]

        // Create the image map
        imageMap = images.map((image, index) => {
          if (image.mime_type === 'image/gif') {
            return <Gif key={index} src={image.url} playing={true}/>
          } else {
            return <RespImage key={index} image={image} respSizes="(min-width: 840px) 320px, 175px"/>
          }
        })

        // Setup the styles if it's being used in a carousel
        if (activeIndex) {
          screenStyles = {
            transform: 'translate3d(0, ' + activeIndex * -100 + '%, 0)'
          }
        }
        return (
          <li key={index} className={css.item}>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 501 1018" xmlnsXlink="http://www.w3.org/1999/xlink">
              <g fill="#fff" fillRule="evenodd" transform="translate(0 2)">
                <rect width="491" height="1014" x="5" fillOpacity=".3" stroke="#fff" strokeWidth="4" rx="75"/>
                <rect width="6" height="75" x="495" y="215" rx="3"/>
                <rect width="6" height="41" y="128" rx="3"/>
                <rect width="6" height="75" y="215" rx="3"/>
                <rect width="6" height="75" y="307" rx="3"/>
                <circle cx="172" cy="64" r="8"/>
                <path d="M251 37c2.7614 0 5-2.2386 5-5s-2.2386-5-5-5-5 2.2386-5 5 2.2386 5 5 5zm-1 946c20.9868 0 38-17.0132 38-38s-17.0132-38-38-38-38 17.0132-38 38 17.0132 38 38 38zm0-3c19.33 0 35-15.67 35-35s-15.67-35-35-35-35 15.67-35 35 15.67 35 35 35z"/>
                <rect width="80" height="8" x="211" y="60" rx="4"/>
              </g>
            </svg>
            <div className={'frame-' + this.compName}>
              <div className="screen" style={screenStyles}>
                {imageMap}
              </div>
            </div>
          </li>
        )
      })
    }

    render() {
      var screenshotListClass
      const {screenshots, modifier} = this.props
      screenshotListClass = css.list + this.compName
      modifier && (screenshotListClass += ' -' + modifier)
      console.log(this.state);

      if (!screenshots)
        return null

      return (
        <ul className={screenshotListClass}>
          {this.screenshotsMap}
        </ul>
      )
    }

}

export default ScreenShots