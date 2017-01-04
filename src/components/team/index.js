import React from 'react';

import css from '../../lib/css';
import ArticleHeader from '../article-header';
import RespImageCover from '../resp-image-cover';
import MemberVcard from '../member-vcard';
import Wysiwyg from '../wysiwyg';

require('./_team.sass');

function Team(props) {
  const {members, compName} = props;

  if (!members)
    return null

  const membersMap = members.map((member) => {
    const {post_title, post_content, acf} = member;
    const compName = 'member'

    return (
      <li key={member.ID} className={css.item}>
        <article className={css.article + compName}>
          <RespImageCover avatar alt={post_title.rendered} image={acf.avatar} respSizes="320px" srcVersion="medium"/>
          <ArticleHeader title={post_title} subtitle={acf.job_title} modifier={compName} />
          <MemberVcard name={post_title.rendered} contacts={acf.contact_details}/>
          <Wysiwyg content={post_content} />
        </article>
      </li>
    );
  });

  return (
    <div className={css.main + compName}>
      <h1 className={css.title}>Our Team</h1>
      <ul className={css.list + compName}>
        {membersMap}
      </ul>
    </div>
  );
}

export default Team;
