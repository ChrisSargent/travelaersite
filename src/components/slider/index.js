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
    this.handleMouseEnter = this.handleMouseEnter.bind(this)
    this.handleMouseLeave = this.handleMouseLeave.bind(this)
    this.pause = this.pause.bind(this)
    this.start = this.start.bind(this)
    this.userStopped = false
  }

  componentWillMount() {
    this.props.registerSlider(this.props.id);
    this.props.updateSlideIndex(this.props.id, 0)
  }

  componentDidMount() {
    this.start()
  }

  componentWillUnmount() {
    this.timeOut && clearTimeout(this.timeOut)
  }

  autoIncrement() {
    const {length} = this.props.slides
    if (length <= 1)
      return
    const timing = this.props.auto * 1000
    this.timeOut = setTimeout(() => {
      const {activeSlide} = this.props
      this.nextActiveIndex(activeSlide + 1)
      this.autoIncrement()
    }, timing);
  }

  handleClick(ev) {
    var nextActive
    if (!ev.target.dataset.slideind)
      return

    const {activeSlide} = this.props
    ev.preventDefault()
    this.pause()
    this.userStopped = true

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

  handleMouseEnter(ev) {
    this.pause()
  }

  handleMouseLeave(ev) {
    !this.userStopped && this.start()
  }

  start() {
    this.props.auto && this.autoIncrement()
  }

  pause() {
    this.timeOut && clearTimeout(this.timeOut)
  }

  render() {
    const {
      slides,
      activeSlide,
      id
    } = this.props


    if (!slides)
      return null

    const compName = 'slider'
    const modifier = ' -' + id
    const showCtrls = (slides.length > 1)
    const slideStyles = {
      transform: 'translateX(' + activeSlide * -100 + '%)'
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
        {showCtrls && <button data-slideind="dec" className={css.control + ' -dec'}>
          <div className={css.container}>
            <span className={css.label}>Prev</span>
          </div>
        </button>}
        <div className={css.container} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave}>
          <ul className={css.list + compName + modifier} style={slideStyles}>
            {slidesMap}
          </ul>
        </div>
        {showCtrls && <button data-slideind="inc" className={css.control + ' -inc'}>
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
