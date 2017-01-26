import React, {Component} from 'react'
import {connect} from 'react-redux'
import css from '../../lib/css'

import Actions from '../actions'
import ArticleHeader from '../article-header'
import SVG from '../svg'

import {postComment, resetMessages, cacheComment} from '../../actions/CommentsActions'

import './_submit.sass'

class Submit extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleTyping = this.handleTyping.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.state = {
      ...this.props.submit
    }
  }

  componentWillMount() {
    // Setup some defaults based on the type
    switch (this.props.postType) {
      case 'comments':
        this.title = 'Leave a Comment'
        this.subtitle = 'Your email address will not be published'
        this.updateComments = true
        break

      case 'enquiries':
        this.title = 'Get in Touch Now'
        this.updateComments = false
        break

      default:
        break
    }
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      ...newProps.submit
    })
  }

  handleTyping(ev) {
    const key = ev.target.name
    this.setState({[key]: ev.target.value})
  }

  handleBlur() {
    this.props.cacheComment(this.state)
  }

  handleSubmit(ev) {
    ev.preventDefault()
    this.props.resetMessages()
    const commentData = '?author_name=' + encodeURIComponent(this.state.name) + '&author_email=' + encodeURIComponent(this.state.email) + '&content=' + encodeURIComponent(this.state.comment) + '&parent=' + encodeURIComponent((this.props.parentCommentID || '0')) + '&post=' + encodeURIComponent(this.props.postID)
    this.props.postComment(commentData, this.updateComments)
  }

  render() {
    var loadingClass
    const compName = 'submit'
    const {showLoader, name, email, comment} = this.state

    showLoader
      ? loadingClass = css.loading
      : loadingClass = ''

    const submitActions = [
      {
        modifier: 'cta',
        linkTitle: 'Submit',
        submit: true
      }, {
        modifier: 'reset',
        linkTitle: 'Cancel',
        param: 'close'
      }
    ]

    return (
      <section className={css.main + compName}>
        <ArticleHeader title={this.title} subtitle={this.subtitle} modifier={compName}/>
        <form className={css.form + compName} onSubmit={this.handleSubmit}>
          <span className="name"><input type="text" placeholder="Name" name="name" value={name} onChange={this.handleTyping} onBlur={this.handleBlur}/></span>
          <span className="email"><input type="email" placeholder="Email" name="email" value={email} onChange={this.handleTyping} onBlur={this.handleBlur}/></span>
          <span className="comment"><textarea placeholder="Your Comment" name="comment" value={comment} onChange={this.handleTyping} onBlur={this.handleBlur}/></span>
          <Actions actions={submitActions}/>
        </form>
        <div className={css.loader + loadingClass + ' -submit'}><SVG type="spinner"/></div>
      </section>
    )
  }
}

const mapStateToProps = (state) => ({submit: state.submit})
const mapDispatchToProps = (dispatch) => ({
  postComment(commentData, updateComments) {
    dispatch(postComment(commentData, updateComments)).catch(error => {})
  },
  cacheComment(uiState) {
    dispatch(cacheComment(uiState))
  },
  resetMessages() {
    dispatch(resetMessages())
  }
})
export default connect(mapStateToProps, mapDispatchToProps)(Submit)
