import React, {Component} from 'react'
import {connect} from 'react-redux'
import {fetchLatestPosts, fetchInitPosts} from '../../actions/PostsActions'
import {getPostsObj} from '../../reducers/posts'
import css from '../../lib/css'
import Helmet from "react-helmet"
import Insta from '../../components/insta'
import Post from '../../components/post'
import RecentPosts from '../../components/recent-posts'
import Section from '../../sections/section'
import './_posts.sass'

class Posts extends Component {
  componentDidMount() {
    const slug = this.props.params.slug
    slug
      ? this.props.fetchInitPosts(slug)
      : this.props.fetchLatestPosts()
  }

  // componentWillReceiveProps(newProps) {
  //   const currentSlug = this.props.params.slug
  //   const newSlug = newProps.params.slug
  //   currentSlug !== newSlug && (this.props.fetchCurrentPost(newSlug))
  // }

  componentDidUpdate() {
    window.twttr && window.twttr.widgets.load()
  }

  render() {
    var heroModifier,
      pageTitle
    const {postsObj} = this.props

    if (!postsObj)
      return null

    const compName = 'posts'
    const overlap = [
      {
        type: 'single',
        position: 'bottom',
        colour: 'white'
      }
    ]

    if (postsObj.main.length > 1) {
      heroModifier = ' -small'
      pageTitle = 'Blog'
    } else {
      heroModifier = ''
      pageTitle = postsObj.main[0].title.rendered
    }

    const postsMap = postsObj.main.map((post, index) => {
      var isMainPost

      index === 0
        ? isMainPost = true
        : isMainPost = false

      return (
        <li key={post.id} className={css.item}>
          <Post post={post} excerpt={postsObj.excerpts} main={isMainPost}/>
        </li>
      )
    })

    return (
      <main>
        <Helmet title={pageTitle}/>
        <Section compName={'hero' + heroModifier} image={postsObj.heroImage} skew="bottom" overlaps={overlap}/>
        <Section compName={compName}>
          <ul className={css.list + compName}>
            {postsMap}
          </ul>
          <aside className={css.sidebar + compName}>
            <RecentPosts posts={postsObj.side}/>
            <Insta/>
          </aside>
        </Section>
      </main>
    )
  }
}

const mapStateToProps = (state, {params}) => ({
  postsObj: getPostsObj(state, params.slug)
})

const mapDispatchToProps = (dispatch) => ({
  fetchLatestPosts() {
    dispatch(fetchLatestPosts())
  },
  fetchInitPosts(slug) {
    dispatch(fetchInitPosts(slug))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
