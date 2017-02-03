import axios from 'axios'
import types from '.'

const fields = 'content,date_gmt,id,link,title,slug,t_author,t_categories,t_comments_info,t_featured_image'

const _getPosts = (page) => {
  var type
  page > 1
    ? type = types.FETCH_MORE_POSTS
    : type = types.FETCH_LATEST_POSTS
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

const _getPost = (slug) => {
  const params = {
    fields,
    slug
  };

  return {
    type: types.FETCH_CURRENT_POST,
    payload: axios.get('/wp/v2/posts', {params}),
    meta: {
      id: 'currentPost'
    }
  }
}

export const fetchLatestPosts = () => (dispatch, getState) => {
  const {fetchedPosts} = getState().posts
  // Check if the latest posts have already been fetched and call the api if not
  if (!fetchedPosts) {
    return dispatch(_getPosts(1))
  } else {
    return null
  }
}

export const fetchMorePosts = () => (dispatch, getState) => {
  const {gotAllPosts, nextPage} = getState().posts
  // Check if all the posts have already been fetched and call the api if not
  if (!gotAllPosts) {
    return dispatch(_getPosts(nextPage))
  } else {
    return null
  }
}

export const fetchInitPosts = (slug) => (dispatch) => {
  return dispatch({
    type: types.FETCH_INIT_POSTS,
    payload: Promise.all([
      dispatch(_getPost(slug)),
      dispatch(_getPosts())
    ])
  })
}
