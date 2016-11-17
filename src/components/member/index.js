import React from 'react';
import ArticleHeader from '../article-header';
import Avatar from '../avatar';
import MemberVcard from '../member-vcard';
import Wysiwyg from '../wysiwyg';

require('./_member.sass');

function Member(props) {
  const {title, content, acf} = props;
  const modifier = 'member'

  return (
    <article className="article-member">
      <Avatar avatar={acf.avatar} modifier={modifier} alt={title}/>
      <div className="member-content">
        <ArticleHeader title={title} subtitle={acf.job_title} modifier={modifier} />
        <div className="content">
          <Wysiwyg content={content} modifier={modifier} />
          <MemberVcard name={title.rendered} contacts={acf.contact_details}/>
        </div>
      </div>
    </article>
  )
}

export default Member;
