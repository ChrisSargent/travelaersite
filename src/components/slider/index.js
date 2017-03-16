import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import css from '../../lib/css'
import {registerSlider, updateSlideIndex} from '../../actions/sliders'
import {getActiveIndex} from '../../reducers/sliders'
import './_slider.sass'

class Slider extends PureComponent {
  constructor(props) {
    super(props)
    this.handleClick = this.handleClick.bind(this)
    this.nextActiveIndex = this.nextActiveIndex.bind(this)
    this.autoIncrement = this.autoIncrement.bind(this)
  }

  componentWillMount() {
    this.props.registerSlider(this.props.id);
  }

  componentDidMount() {
    this.props.auto && this.autoIncrement()
  }

  autoIncrement() {
    const self = this
    const timing = this.props.auto * 1000
    setTimeout(function () {
      const {activeSlide} = self.props
      self.nextActiveIndex(activeSlide + 1)
      self.autoIncrement()
    }, timing);
  }

  handleClick(ev) {
    var nextActive
    if (!ev.target.dataset.slideind)
      return

    const {activeSlide} = this.props
    ev.preventDefault()
    switch (ev.target.dataset.slideind) {
      case 'inc':
        nextActive = activeSlide + 1
        break

      case 'dec':
        nextActive = activeSlide - 1
        break

      default:
        nextActive = parseFloat(ev.target.dataset.slideind)
    }
    this.nextActiveIndex(nextActive)
  }

  nextActiveIndex(nextActive) {
    const {length} = this.props.slides
    if (nextActive < 0)
      nextActive = length - 1

    if (nextActive > length - 1)
      nextActive = 0
    this.props.updateSlideIndex(this.props.id, nextActive)
  }

  render() {
    const {
      slides,
      activeSlide,
      id,
      auto
    } = this.props


    if (!slides)
      return null

    const compName = 'slider'
    const modifier = ' -' + id
    const slideStyles = {
      transform: 'translate3d(' + activeSlide * -100 + '%, 0, 0)'
    }

    const slidesMap = slides.map((slide, index) => {
      var itemClass = css.item
      index === activeSlide && (itemClass += css.active)
      return (
        <li key={index} className={itemClass}>
          {slide}
        </li>
      )
    })
    return (
      <div onClick={this.handleClick} className={css.main + compName + modifier}>
        {!auto && <button data-slideind="dec" className={css.control + ' -dec'}>
          <div className={css.container}>
            <span className={css.label}>Prev</span>
          </div>
        </button>}
        <div className={css.container}>
          <ul className={css.list + compName + modifier} style={slideStyles}>
            {slidesMap}
          </ul>
        </div>
        {!auto && <button data-slideind="inc" className={css.control + ' -inc'}>
          <div className={css.container}>
            <span className={css.label}>Next</span>
          </div>
        </button>}
      </div>
    )
  }
}

const mapStateToProps = (state, ownProps) => ({
  activeSlide: getActiveIndex(state, ownProps.id)
})

const mapDispatchToProps = (dispatch) => ({
  registerSlider(id) {
    dispatch(registerSlider(id))
  },
  updateSlideIndex(id, index) {
    dispatch(updateSlideIndex(id, index))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Slider)
