import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {fetchMorePosts, fetchInitPosts, fetchPosts} from '../../actions/posts'
import {getPosts, getLoadingMore} from '../../reducers/posts'
import css from '../../lib/css'
import {image404, trimContent, stripTags} from '../../lib/utils'
import Actions from '../../components/actions'
import Head from '../../components/head'
import Insta from '../../components/insta'
import Post from '../../components/post'
import PostError from '../../components/error-post'
import RecentPosts from '../../components/recent-posts'
import Section from '../../sections/section'
import './_posts.sass'

class Posts extends PureComponent {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this)
    this.setupRelatedPosts = this.setupRelatedPosts.bind(this)
    this.setupPostsObject = this.setupPostsObject.bind(this)
    this.setPostsCategory = this.setPostsCategory.bind(this)
    this.setPostsCategory(this.props)
    this.postsObj = this.setupPostsObject(this.props)
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
        loading: false
      }
    ]
  }

  static fetchData(store, props) {
    const {slug} = props.params
    if (slug) {
      return store.dispatch(fetchInitPosts(slug, this.postsCategory))
    } else {
      return store.dispatch(fetchPosts(this.postsCategory))
    }
  }

  componentDidMount() {
    const {slug} = this.props.params
    if (slug) {
      this.props.fetchInitPosts(slug, this.postsCategory)
    } else {
      this.props.fetchPosts(this.postsCategory)
    }
  }

  componentWillReceiveProps(newProps) {
    this.setPostsCategory(newProps)
    this.postsObj = this.setupPostsObject(newProps)
  }

  componentDidUpdate() {
    window.twttr && window.twttr.widgets.load()
  }

  setPostsCategory(props) {
    this.postsCategory = props.params.category || '__latest'
  }

  setupRelatedPosts(props) {
    const {fetchedPosts, orderedSlugs} = props.posts

    if (!orderedSlugs[this.postsCategory])
      return null

    const {slug} = props.params
    const {slugs} = orderedSlugs[this.postsCategory]
    // Looks up the slug from the posts array, grabs the corresponding post from the fetchedPosts array and puts it into the returned object.
    var count = 0,
      maxPosts = slugs.length,
      relatedPosts = [],
      lookupSlug

    slug && (maxPosts = 8)

    for (var i = 0; i < slugs.length; i++) {
      lookupSlug = slugs[i]
      lookupSlug !== slug && count < maxPosts && (relatedPosts.push(fetchedPosts[lookupSlug]))
      count++
    }
    return relatedPosts
  }

  setupPostsObject(props) {
    // Returns an object with the main post or posts and those to display in the sidebar
    const {fetchedPosts} = props.posts
    const {slug} = props.params

    if (!fetchedPosts)
      return null

    const relatedPosts = this.setupRelatedPosts(props);

    if (!relatedPosts)
      return null

    if (slug) {
      const singlePost = fetchedPosts[slug]
      return {
        main: [singlePost],
        side: relatedPosts,
        heroImage: singlePost.t_featured_image,
        excerpts: false
      }
    }
    return {
      main: relatedPosts.slice(0, 5).concat(relatedPosts.slice(10)),
      side: relatedPosts.slice(5, 10),
      heroImage: relatedPosts[0].t_featured_image,
      excerpts: true
    }
  }

  handleClick(ev) {
    if (!ev.target.dataset.actionparam)
      return
    ev.preventDefault()
    ev.target.dataset.actionparam === 'loadmore' && this.props.fetchMorePosts(this.postsCategory)
  }

  render() {
    var heroModifier = ' -small',
      pageTitle = 'Blog',
      showMore = true

    const {getLoadingMore} = this.props
    const {postsObj} = this

    if (!postsObj)
      return null

    const {compName, overlap, actions} = this
    const singlePost = postsObj.main.length <= 1
    const mainPost = postsObj.main[0]
    const postsMap = postsObj.main.map((post, index) => {
      return (
        <li key={post.id || 'invalid'} className={css.item}>
          {post.invalid
            ? <PostError/>
            : <Post post={post} excerpt={postsObj.excerpts} main={index === 0}/>}
        </li>
      )
    })

    const categoryObj = this.props.posts.orderedSlugs[this.postsCategory]
    const gotAllCategoryPosts = categoryObj.slugs.length >=  categoryObj.totalPosts

    showMore = !gotAllCategoryPosts && !singlePost

    actions[0].loading = getLoadingMore

    if (singlePost && !mainPost.invalid) {
      heroModifier = ''
      pageTitle = mainPost.title
    }

    const metaInfo = {
      title: pageTitle,
      image: postsObj.heroImage,
      description: stripTags(trimContent(mainPost.content))
    }

    return (
      <main id={compName}>
        <Head {...metaInfo}/>
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

const mapStateToProps = (state) => ({posts: getPosts(state), getLoadingMore: getLoadingMore(state)})

const mapDispatchToProps = (dispatch) => ({
  fetchPosts(category) {
    dispatch(fetchPosts(category))
  },
  fetchMorePosts(category) {
    dispatch(fetchMorePosts(category))
  },
  fetchInitPosts(slug, category) {
    dispatch(fetchInitPosts(slug, category))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
