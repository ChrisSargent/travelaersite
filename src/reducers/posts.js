import types from '../actions'

const generateSide = (latestPosts, slug) => {
  var count = 0,
    filteredPosts = []

  for (var i = 0; i < latestPosts.length; i++) {
    (latestPosts[i].slug !== slug && count < 7) && (filteredPosts.push(latestPosts[i]))
    count++
  }
  return filteredPosts
}

export const getPostsObj = ({posts}, slug) => {
  const {latestPosts, allPosts} = posts
  var postsObj

  if (!latestPosts || !allPosts)
    return null

  if (slug) {
    postsObj = {
      main: [allPosts[slug]],
      side: generateSide(latestPosts, slug),
      heroImage: allPosts[slug].t_featured_image,
      excerpts: false
    }

  } else {
    postsObj = {
      main: latestPosts.slice(0, 5),
      side: latestPosts.slice(5),
      heroImage: latestPosts[0].t_featured_image,
      excerpts: true
    }

  }
  return postsObj
}

const updateLookup = (posts, allPosts) => {
  // Puts each post in to an array, indexed by its slug
  for (var i = 0; i < posts.length; i++) {
    const post = posts[i]
    if (!allPosts[post.slug]) {
      allPosts = {
        ...allPosts,
        [post.slug]: post
      }
    }
  }
  return allPosts
}

const PostsReducer = (state = {
  allPosts: false,
  latestPosts: false,
  postsObj: false
}, action) => {

  switch (action.type) {
    case types.FETCH_LATEST_POSTS + '_FULFILLED':
      const latestPosts = action.payload.data
      return {
        ...state,
        allPosts: updateLookup(latestPosts, state.allPosts),
        latestPosts
      }

    case types.FETCH_CURRENT_POST + '_FULFILLED':
      const currentPost = action.payload.data
      return {
        ...state,
        allPosts: updateLookup(currentPost, state.allPosts)
      }

    case types.FETCH_INIT_POSTS + '_FULFILLED':
      return state

    case types.REFRESH_COMMENTS + '_FULFILLED':
      const {slug, t_comments_info} = action.payload.data
      return {
        ...state,
        allPosts: {...state.allPosts,
          [slug]: {
            ...state.allPosts[slug],
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
