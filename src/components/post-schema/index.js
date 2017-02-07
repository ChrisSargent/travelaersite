import React from 'react'
import {connect} from 'react-redux'
import {getOptions} from '../../reducers/site'
import {globals} from '../../lib/utils'

const PostMeta = ({post, options}) => {
  if (!post || !options)
    return null

  const data = {
    "@context": "http://schema.org",
    "@type": "Article",
    "headline": "TEST",
    "alternativeHeadline": "",
    "image": {
      "@type": "ImageObject",
      "url": post.t_featured_image.url,
      "height": post.t_featured_image.height,
      "width": post.t_featured_image.width
    },
    "author": {
      "@type": "Person",
      "name": post.t_author.name
    },
    "genre": "",
    "keywords": post.t_categories.join(),
    "url": post.url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.url
    },
    "datePublished": post.date_gmt,
    "dateModified": post.modified_gmt,
    "description": "",
    "articleBody": "TEST",
    "commentCount": post.t_comments_info.total,
    "publisher": {
      "@id": globals.baseUrl
    },
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(data)}
    </script>
  )
}
const mapStateToProps = (state) => ({options: getOptions(state)})
export default connect(mapStateToProps)(PostMeta)
