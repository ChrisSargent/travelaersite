import types from '../actions'
import {globals, stripDomain, whichContent} from '../lib/utils'
import he from 'he'

export const getLoadingMore = ({posts}) => {
  return posts.fetchingMore
}

export const getPosts = ({posts}) => {
  return posts
}

const _addFetchedPosts = (action, fetchedPosts) => {
  // Puts each post in to an object, indexed by its slug
  const posts = action.payload.data
  var addPosts = {}
  if (posts.length) {
    for (var i = 0; i < posts.length; i++) {
      const post = posts[i]
      post.link = stripDomain(post.link)
      post.url = globals.baseUrl + post.link
      // Don't need to 'he decode' content because it's used with dangerouslySetInnerHTML
      post.content = whichContent(post.content)
      post.title = he.decode(whichContent(post.title))
      post.slug = he.decode(post.slug)
      addPosts[post.slug] = post
    }
  } else {
    addPosts[action.meta.slug] = {
      invalid: true
    };
  }
  return {
    ...fetchedPosts,
    ...addPosts
  }
}

const _addToOrderedSlugs = (action, orderedSlugs) => {
  var nextPage = 2,
    slugs = []
  const posts = action.payload.data
  const category = action.meta.category
  if (orderedSlugs[category]) {
    nextPage = orderedSlugs[category].nextPage + 1
    slugs = orderedSlugs[category].slugs
  }
  // Create an array of post slugs
  const addPosts = posts.reduce((result, post) => {
    const slug = he.decode(post.slug)
    slugs.indexOf(slug) < 0 && result.push(slug)
    return result;
  }, []);

  return {
    ...orderedSlugs,
    [category]: {
      ...orderedSlugs[category],
      slugs: [
        ...slugs,
        ...addPosts
      ],
      totalPosts: parseFloat(action.payload.headers['x-wp-total']),
      nextPage
    }
  }
}

const PostsReducer = (state = {
  fetchedPosts: false,
  orderedSlugs: {
    __latest: {
      slugs: [],
      totalPosts: false,
      nextPage: 1
    }
  },
  fetchingMore: false
}, action) => {

  var fetchedPosts,
    orderedSlugs
  switch (action.type) {
    case types.FETCH_MORE_POSTS + '_PENDING':
      return {
        ...state,
        fetchingMore: true
      }

    case types.FETCH_MORE_POSTS + '_FULFILLED':
    case types.FETCH_LATEST_POSTS + '_FULFILLED':
      orderedSlugs = _addToOrderedSlugs(action, state.orderedSlugs)
      fetchedPosts = _addFetchedPosts(action, state.fetchedPosts)
      return {
        ...state,
        orderedSlugs,
        fetchedPosts,
        fetchingMore: false
      }

    case types.FETCH_CURRENT_POST + '_FULFILLED':
      fetchedPosts = _addFetchedPosts(action, state.fetchedPosts)
      return {
        ...state,
        fetchedPosts
      }

    case types.REFRESH_COMMENTS + '_FULFILLED':
      const {slug, t_comments_info} = action.payload.data
      return {
        ...state,
        fetchedPosts: {
          ...state.fetchedPosts,
          [slug]: {
            ...state.fetchedPosts[slug],
            t_comments_info: t_comments_info
          }
        }
      }
    default:
      break
  }

  return state
}

export default PostsReducer
