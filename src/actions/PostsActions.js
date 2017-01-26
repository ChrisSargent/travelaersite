import axios from 'axios'

// export const fetchPost = (postID) => {
//   const params = {
//     fields: 'id,t_comments_info'
//   }
//   axios.get('/wp/v2/posts/' + postID, {params}).then(function(response) {
//     // console.log('fetchPost: ', response.data);
//     dispatcher.dispatch({type: 'RECEIVE_POST', post: response.data});
//   }).catch(function(error) {
//     console.log(error);
//   });
// }

const _getPosts = (slug) => {
  var type,
    id

  if (slug) {
    type = 'FETCH_CURRENT_POST'
    id = 'currentPost'
  } else {
    type = 'FETCH_LATEST_POSTS'
    id = 'posts'
  }

  const params = {
    fields: 'content,date_gmt,id,title,slug,t_author,t_categories,t_comments_info,t_featured_image',
    slug: slug
  };

  return {
    type: type,
    payload: axios.get('/wp/v2/posts', {params}),
    meta: {
      id: id
    }
  }
}

export const fetchLatestPosts = () => (dispatch, getState) => {
  const {latestPosts} = getState().posts
  // Check if the latest posts have already been fetched and call the api if not
  if (!latestPosts.length) {
    return dispatch(_getPosts())
  } else {
    return null
  }
}

export const fetchCurrentPost = (slug) => (dispatch, getState) => {
  // Check if the post has already been fetched and call the api if not
  const {allPosts} = getState().posts
  const index = allPosts[slug];
  if (!index) {
    return dispatch(_getPosts(slug))
  } else {
    return null
  }
}

export const fetchInitPosts = (slug) => (dispatch) => {
  return dispatch({
    type: 'FETCH_INIT_POSTS',
    payload: Promise.all([
      dispatch(_getPosts(slug)),
      dispatch(_getPosts())
    ])
  })
}
