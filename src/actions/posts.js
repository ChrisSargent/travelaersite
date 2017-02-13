import axios from 'axios'
import types from '.'

const fields = 'content,date_gmt,id,link,modified_gmt,title,slug,t_author,t_categories,t_comments_info,t_featured_image'
// const fields = false

const _getPosts = (page = 1) => {
  var type
  page <= 1
    ? type = types.FETCH_LATEST_POSTS
    : type = types.FETCH_MORE_POSTS
  const params = {
    fields,
    page
  };

  return {
    type,
    payload: axios.get('/wp/v2/posts', {params}),
    meta: {
      id: 'posts'
    }
  }
}

const _getSinglePost = (slug) => {
  const params = {
    fields,
    slug
  };

  return {
    type: types.FETCH_CURRENT_POST,
    payload: axios.get('/wp/v2/posts', {params}),
    meta: {
      id: 'currentPost',
      slug
    }
  }
}

export const fetchLatestPosts = () => (dispatch, getState) => {
  const {fetchedPosts} = getState().posts
  // Check if the latest posts have already been fetched and call the api if not
  return fetchedPosts
    ? Promise.resolve()
    : dispatch(_getPosts())
}

export const fetchMorePosts = () => (dispatch, getState) => {
  const {gotAllPosts, nextPage} = getState().posts
  // Check if all the posts have already been fetched and call the api if not
  return gotAllPosts
    ? null
    : dispatch(_getPosts(nextPage))
}

export const fetchInitPosts = (slug) => (dispatch, getState) => {
  const post = getState().posts.fetchedPosts[slug]
  return post
    ? Promise.resolve()
    : dispatch({
      type: types.FETCH_INIT_POSTS,
      payload: Promise.all([
        dispatch(_getSinglePost(slug)),
        dispatch(fetchLatestPosts())
      ])
    })
}
