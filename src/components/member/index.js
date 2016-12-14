import React from 'react';
import css from '../../lib/css';

import ArticleHeader from '../article-header';
import RespImageCover from '../resp-image-cover';
import MemberVcard from '../member-vcard';
import Wysiwyg from '../wysiwyg';

require('./_member.sass');

function Member(props) {
  const {title, content, acf} = props;
  const compName = 'member'

  return (
    <article className={css.article + compName}>
      <RespImageCover alt={title} className={css.avatar} image={acf.avatar} respSizes="320px" srcVersion="medium"/>
      <ArticleHeader title={title} subtitle={acf.job_title} modifier={compName} />
      <MemberVcard name={title.rendered} contacts={acf.contact_details}/>
      <Wysiwyg content={content} />
    </article>
  )
}

export default Member;


// <div className={css.content + compName}></div>
