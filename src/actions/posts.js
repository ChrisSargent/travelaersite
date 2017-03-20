import axios from 'axios'
import types from '.'

const fields = 'acf,content,date_gmt,id,link,modified_gmt,title,slug,t_author,t_categories,t_comments_info,t_content,t_featured_image'

const _getPosts = (page = 1, category) => {
  var type
  page <= 1
    ? type = types.FETCH_LATEST_POSTS
    : type = types.FETCH_MORE_POSTS

  const params = {
    fields,
    page
  };

  category !== '__latest' && (params['filter[category_name]'] = category)

  return {
    type,
    payload: axios.get('/wp/v2/posts', {params}),
    meta: {
      id: 'posts',
      category
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

export const fetchMorePosts = (category) => (dispatch, getState) => {
  const {slugs, totalPosts, nextPage} = getState().posts.orderedSlugs[category]
  // Check if all the posts have already been fetched and call the api if not
  return slugs.length < totalPosts
    ? dispatch(_getPosts(nextPage, category))
    : null
}

export const fetchPosts = (category) => (dispatch, getState) => {
  const categoryObj = getState().posts.orderedSlugs[category]
  return categoryObj && categoryObj.slugs.length
    ? Promise.resolve()
    : dispatch(_getPosts(1, category))
}

export const fetchInitPosts = (slug, category) => (dispatch, getState) => {
  const post = getState().posts.fetchedPosts[slug]

  return post
    ? Promise.resolve()
    : dispatch({
      type: types.FETCH_INIT_POSTS,
      payload: Promise.all([
        dispatch(_getSinglePost(slug)),
        dispatch(fetchPosts(category)),
      ]).catch((error)=>{
        console.log('Error: ' + error);
      })
    })
}
