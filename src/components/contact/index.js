import React from 'react';
import css from '../../lib/css';

import Message from '../message';
import Submit from '../submit';
import Social from '../social';

require('./_contact.sass');

function Contact(props) {
  const {compName, options, pageID} = props;

  if(!options)
    return null;

  return (
    <div className={css.main + compName}>
      <Social socialNetworks={options.socialNetworks}/>
      <div className={css.wrap}>
        <Message />
        <Submit postType="enquiries" postID={pageID}/>
      </div>
    </div>
  );
}

export default Contact;
