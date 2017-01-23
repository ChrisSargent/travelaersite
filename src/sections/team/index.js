import React from 'react';

import css from '../../lib/css';
import ArticleHeader from '../../components/article-header';
import RespImageCover from '../../components/resp-image-cover';
import MemberVcard from '../../components/member-vcard';
import Wysiwyg from '../../components/wysiwyg';

import './_team.sass';

function Team(props) {
  const {title, members, compName} = props;

  if (!members)
    return null

  const membersMap = members.map((member) => {
    const {title, content, acf} = member;
    const compName = 'member'

    return (
      <li key={member.id} className={css.item}>
        <article className={css.article + compName}>
          <RespImageCover avatar alt={title} image={acf.avatar} respSizes="320px" srcVersion="medium"/>
          <ArticleHeader title={title} subtitle={acf.job_title} modifier={compName} />
          <MemberVcard name={title} contacts={acf.contact_details}/>
          <Wysiwyg content={content} />
        </article>
      </li>
    );
  });

  return (
    <div className={css.main + compName}>
      {title && <h1 className={css.title}>{title}</h1>}
      <ul className={css.list + compName}>
        {membersMap}
      </ul>
    </div>
  );
}

export default Team;
