import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchMorePosts} from '../../actions/posts'
import {getPostsObj, gotAllPosts, getLoadingMore} from '../../reducers/posts'
import css from '../../lib/css'
import {image404} from '../../lib/utils'
import Actions from '../../components/actions'
import Helmet from 'react-helmet'
import Insta from '../../components/insta'
import Post from '../../components/post'
import PostError from '../../components/error-post'
import RecentPosts from '../../components/recent-posts'
import Section from '../../sections/section'
import './_posts.sass'

class Posts extends Component {
  constructor() {
    super();
    this.handleClick = this.handleClick.bind(this)
    this.compName = 'posts'
    this.overlap = [
      {
        type: 'single',
        position: 'bottom',
        colour: 'white'
      }
    ]
    this.actions = [
      {
        linkTitle: 'Load More',
        param: 'loadmore',
        modifier: 'cta',
        loading: false,
      }
    ]
  }

  componentDidUpdate() {
    window.twttr && window.twttr.widgets.load()
  }

  handleClick(ev) {
    if (!ev.target.dataset.actionparam)
      return
    ev.preventDefault()
    this.props.fetchMorePosts()
  }

  render() {
    var heroModifier = ' -small',
      pageTitle = 'Blog',
      showMore = true

    const {postsObj, gotAllPosts, getLoadingMore} = this.props

    if (!postsObj)
      return null

    const {compName, overlap, actions} = this
    const singlePost = postsObj.main.length <= 1
    const {invalid} = postsObj.main[0]

    if (singlePost && !invalid) {
      heroModifier = ''
      pageTitle = postsObj.main[0].title
    }

    showMore = !gotAllPosts && !singlePost

    getLoadingMore
      ? actions[0].loading = true
      : actions[0].loading = false

    const postsMap = postsObj.main.map((post, index) => {
      return (
        <li key={post.id || 'invalid'} className={css.item}>
          {post.invalid
            ? <PostError />
            : <Post post={post} excerpt={postsObj.excerpts} main={index === 0}/>
          }
        </li>
      )
    })

    return (
      <main id={compName}>
        <Helmet title={pageTitle}/>
        <Section compName={'hero' + heroModifier} image={postsObj.heroImage || image404} skew="bottom" overlaps={overlap}/>
        <Section compName={compName}>
          <div className={css.main + compName}>
            <ul className={css.list + compName}>
              {postsMap}
            </ul>
            <aside className={css.sidebar + compName}>
              <RecentPosts posts={postsObj.side}/>
              {showMore && <Actions actions={actions} onClick={this.handleClick}/>}
              <Insta/>
            </aside>
          </div>
        {showMore && <Actions actions={actions} onClick={this.handleClick}/>}
        </Section>
      </main>
    )
  }
}

const mapStateToProps = (state, {params}) => ({
  postsObj: getPostsObj(state, params.slug),
  gotAllPosts: gotAllPosts(state),
  getLoadingMore: getLoadingMore(state)
})

const mapDispatchToProps = (dispatch) => ({
  fetchMorePosts() {
    dispatch(fetchMorePosts())
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
