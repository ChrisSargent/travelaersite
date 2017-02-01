import types from '../actions'

const _getLatestPosts = ({slugsByDate, fetchedPosts}, slug) => {
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

export const getPostsObj = ({posts}, slug) => {
  // Returns an object with the main post or posts and those to display in the sidebar
  const {slugsByDate, fetchedPosts} = posts
  var postsObj

  if (!slugsByDate || !fetchedPosts)
    return null

  if (slug) {
    const singlePost = fetchedPosts[slug]
    postsObj = {
      main: [singlePost],
      side: _getLatestPosts(posts, slug),
      heroImage: singlePost.t_featured_image,
      excerpts: false
    }

  } else {
    const latestPosts = _getLatestPosts(posts);
    postsObj = {
      main: latestPosts.slice(0, 5).concat(latestPosts.slice(10)),
      side: latestPosts.slice(5, 10),
      heroImage: latestPosts[0].t_featured_image,
      excerpts: true
    }

  }
  return postsObj
}

export const gotAllPosts = ({posts}) => {
  return posts.gotAllPosts
}

const _addFetchedPosts = (posts, fetchedPosts) => {
  // Puts each post in to an object, indexed by its slug (if it's not already present)
  var addPosts = {}
  for (var i = 0; i < posts.length; i++) {
    const post = posts[i]
    !fetchedPosts[post.slug] && (addPosts[post.slug] = post)
  }
  return {...fetchedPosts, ...addPosts}
}

const _addToPostsByDate = (posts, slugsByDate) => {
  // Create an array of post slugs by date
  const addPosts = posts.map((post) => {
    return post.slug
  })
  return [...slugsByDate, ...addPosts]
}

const PostsReducer = (state = {
  fetchedPosts: false,
  slugsByDate: false,
  gotAllPosts: false,
  nextPage: 1,
}, action) => {

  switch (action.type) {
    case types.FETCH_MORE_POSTS + '_FULFILLED':
    case types.FETCH_LATEST_POSTS + '_FULFILLED':
      const posts = action.payload.data
      const slugsByDate = _addToPostsByDate(posts, state.slugsByDate)
      const totalPosts = parseFloat(action.payload.headers['x-wp-total'])
      const fetchedPosts = _addFetchedPosts(posts, state.fetchedPosts)
      const gotAllPosts = slugsByDate.length === totalPosts
      const nextPage = state.nextPage + 1
      return {
        ...state,
        slugsByDate,
        fetchedPosts,
        gotAllPosts,
        nextPage
      }

    case types.FETCH_CURRENT_POST + '_FULFILLED':
      const currentPost = action.payload.data
      return {
        ...state,
        fetchedPosts: _addFetchedPosts(currentPost, state.fetchedPosts)
      }

    case types.FETCH_INIT_POSTS + '_FULFILLED':
      return state

    case types.REFRESH_COMMENTS + '_FULFILLED':
      const {slug, t_comments_info} = action.payload.data
      return {
        ...state,
        fetchedPosts: {...state.fetchedPosts,
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
