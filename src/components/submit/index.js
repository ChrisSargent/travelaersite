import React, {Component} from 'react'
import css from '../../lib/css'

import Actions from '../actions'
import ArticleHeader from '../article-header'
import SVG from '../svg'

import {postComment, resetMessages} from '../../actions/CommentsActions'
import SubmitStore from '../../stores/SubmitStore'
import store from '../../store'

import './_submit.sass'

export default class Submit extends Component {
  constructor(props) {
    super(props)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleChange = this.handleChange.bind(this)
    this.handleBlur = this.handleBlur.bind(this)
    this.handleUpdate = this.handleUpdate.bind(this)
    this.state = SubmitStore.getCachedState()
  }

  componentWillMount() {
    SubmitStore.on('change', this.handleUpdate)
    this.mounted = true

    // Setup some defaults base on the type
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
    }

  }

  componentWillUnmount() {
    SubmitStore.removeListener('change', this.handleUpdate)
    this.mounted = false
  }

  handleUpdate() {
    // Put in this guard because as the form is reset the component gets unMounted
    // but the setState has already been called otherwise. Have checked for memory leaks but there are none.
    this.mounted && this.setState(SubmitStore.getCachedState())
  }

  handleChange(ev) {
    const key = ev.target.name
    this.setState({[key]: ev.target.value})
  }

  handleBlur() {
    // CommentsActions.cacheState(this.state)
  }

  handleSubmit(ev) {
    ev.preventDefault()
    resetMessages()
    const commentData = '?author_name=' + encodeURIComponent(this.state.name) + '&author_email=' + encodeURIComponent(this.state.email) + '&content=' + encodeURIComponent(this.state.comment) + '&parent=' + encodeURIComponent((this.props.parentCommentID || '0')) + '&post=' + encodeURIComponent(this.props.postID)
    store.dispatch(postComment(commentData, this.updateComments)).catch(error => {})
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
          <span className="name"><input type="text" placeholder="Name" name="name" value={name} onChange={this.handleChange} onBlur={this.handleBlur}/></span>
          <span className="email"><input type="email" placeholder="Email" name="email" value={email} onChange={this.handleChange} onBlur={this.handleBlur}/></span>
          <span className="comment"><textarea placeholder="Your Comment" name="comment" value={comment} onChange={this.handleChange} onBlur={this.handleBlur}/></span>
          <Actions actions={submitActions}/>
        </form>
        <div className={css.loader + loadingClass + ' -submit'}><SVG type="spinner"/></div>
      </section>
    )
  }
}
