import React from 'react';
import css from '../../lib/css';

import ArticleHeader from '../article-header';
import ImageCover from '../image-cover';
import MemberVcard from '../member-vcard';
import Wysiwyg from '../wysiwyg';

require('./_member.sass');

function Member(props) {
  const {title, content, acf} = props;
  const compName = 'member'

  return (
    <article className={css.article + compName}>
      <ImageCover avatar="true" image={acf.avatar} alt={title}/>
      <div className={css.content + compName}>
        <ArticleHeader title={title} subtitle={acf.job_title} modifier={compName} />
        <div className={css.wrap}>
          <Wysiwyg content={content} />
          <MemberVcard name={title.rendered} contacts={acf.contact_details}/>
        </div>
      </div>
    </article>
  )
}

export default Member;
