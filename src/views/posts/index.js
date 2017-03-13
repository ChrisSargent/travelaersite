import React, {PureComponent} from 'react'
import {connect} from 'react-redux'
import {fetchMorePosts, fetchInitPosts, fetchLatestPosts} from '../../actions/posts'
import {gotAllPosts, getLoadingMore} from '../../reducers/posts'
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
    this.setupLatestPosts = this.setupLatestPosts.bind(this)
    this.setupPostsObject = this.setupPostsObject.bind(this)
    this.postsObj = this.setupPostsObject(this.props.posts, this.props.params.slug)
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
      return store.dispatch(fetchInitPosts(slug))
    } else {
      return store.dispatch(fetchLatestPosts())
    }
  }

  componentDidMount() {
    const {slug} = this.props.params
    if (slug) {
      this.props.fetchInitPosts(slug)
    } else {
      this.props.fetchLatestPosts()
    }
  }

  componentWillReceiveProps(newProps) {
    this.postsObj = this.setupPostsObject(newProps.posts, newProps.params.slug)
  }

  componentDidUpdate() {
    window.twttr && window.twttr.widgets.load()
  }

  setupLatestPosts(posts, slug) {
    const {slugsByDate, fetchedPosts} = posts;
    // Looks up the slug from the slugsByDate array, grabs the corresponding post from the fetchedPosts array and puts it into the returned object.
    var count = 0,
      maxPosts = slugsByDate.length,
      latestPosts = [],
      lookupSlug

    slug && (maxPosts = 8)

    for (var i = 0; i < slugsByDate.length; i++) {
      lookupSlug = slugsByDate[i]
      lookupSlug !== slug && count < maxPosts && (latestPosts.push(fetchedPosts[lookupSlug]))
      count++
    }
    return latestPosts
  }

  setupPostsObject(posts, slug) {
    // Returns an object with the main post or posts and those to display in the sidebar
    const {slugsByDate, fetchedPosts} = posts

    if (!slugsByDate || !fetchedPosts)
      return null

    const latestPosts = this.setupLatestPosts(posts, slug);

    if (slug) {
      const singlePost = fetchedPosts[slug]
      return {
        main: [singlePost],
        side: latestPosts,
        heroImage: singlePost.t_featured_image,
        excerpts: false
      }
    }
    return {
      main: latestPosts.slice(0, 5).concat(latestPosts.slice(10)),
      side: latestPosts.slice(5, 10),
      heroImage: latestPosts[0].t_featured_image,
      excerpts: true
    }
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

    const {gotAllPosts, getLoadingMore} = this.props
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

    showMore = !gotAllPosts && !singlePost

    getLoadingMore
      ? actions[0].loading = true
      : actions[0].loading = false

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

const mapStateToProps = (state) => ({posts: state.posts, gotAllPosts: gotAllPosts(state), getLoadingMore: getLoadingMore(state)})

const mapDispatchToProps = (dispatch) => ({
  fetchLatestPosts() {
    dispatch(fetchLatestPosts())
  },
  fetchMorePosts() {
    dispatch(fetchMorePosts())
  },
  fetchInitPosts(slug) {
    dispatch(fetchInitPosts(slug))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
