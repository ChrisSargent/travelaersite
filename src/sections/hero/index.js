import React from 'react'
import Actions from '../../components/actions'
import {stripDomain} from '../../lib/utils'
import css from '../../lib/css'
import RecentPosts from '../../components/recent-posts'
import Wysiwyg from '../../components/wysiwyg'
import './_hero.sass'

const Hero = ({
  compName,
  content,
  paragraphWidth,
  headline_wysiwyg,
  actions,
  latestPosts
}) => {
  var modifier = ''

  for (var post in latestPosts) {
    if (latestPosts.hasOwnProperty(post)) {
      latestPosts[post].link = stripDomain(latestPosts[post].link)
    }
  }

  latestPosts && latestPosts.length && (modifier = ' -latestposts')

  return (
    <div className={css.main + compName + modifier}>
      <div className={css.container}>
        {headline_wysiwyg && <h1 className={css.title} dangerouslySetInnerHTML={{
          __html: headline_wysiwyg
        }}/>}
        <Wysiwyg content={content} size={paragraphWidth}/>
        <Actions actions={actions}/>
      </div>
      <RecentPosts posts={latestPosts} compact="true"/>
    </div>
  )
}

export default Hero
