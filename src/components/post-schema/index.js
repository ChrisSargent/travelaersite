import React from 'react'
import {connect} from 'react-redux'
import {getOptions} from '../../reducers/site'
import {globals, stripTags, trimContent} from '../../lib/utils'

const PostSchema = ({post, options}) => {
  if (!post || !options)
    return null

  const {url, height, width} = post.t_featured_image;

  const data = {
    "@context": "http://schema.org",
    "@type": "Article",
    "headline": post.title,
    "description": stripTags(trimContent(post.content)) || "",
    "articleBody": stripTags(post.content) || "",
    "image": {
      "@type": "ImageObject",
      "url": url || "",
      "height": height ? String(height) : "",
      "width": width ? String(width) : ""
    },
    "author": {
      "@type": "Person",
      "name": post.t_author.name || ""
    },
    "genre": "",
    "keywords": post.t_categories.join() || "",
    "url": post.url,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": post.url
    },
    "datePublished": post.date_gmt,
    "dateModified": post.modified_gmt,
    "publisher": {
      "@id": globals.baseUrl
    },
    "commentCount": String(post.t_comments_info.total) || "0",
  }

  return (
    <script type="application/ld+json">
      {JSON.stringify(data)}
    </script>
  )
}
const mapStateToProps = (state) => ({options: getOptions(state)})
export default connect(mapStateToProps)(PostSchema)
