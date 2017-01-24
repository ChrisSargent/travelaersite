import React from 'react';
import css from '../../lib/css';

import Message from '../../components/message';
import Submit from '../../components/submit';
import Social from '../../components/social';

import './_contact.sass';

function Contact(props) {
  const {compName, options, pageID} = props;

  if(!options)
    return null;

  return (
    <div className={css.main + compName}>
      <Social socialNetworks={options.socialNetworks}/>
      <div className={css.container}>
        <Message />
        <Submit postType="enquiries" postID={pageID}/>
      </div>
    </div>
  );
}

export default Contact;