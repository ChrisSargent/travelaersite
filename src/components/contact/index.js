import React from 'react';
import css from '../../lib/css';

import CommentForm from '../comment-form';
import Social from '../social';

require('./_contact.sass');

function Contact(props) {
  console.log(props);
  const {compName, options} = props;
  if(!options)
    return null;

  return (
    <div className={css.block + compName}>
      <Social socialNetworks={options.socialNetworks}/>
      <CommentForm />
    </div>
  );
}

export default Contact;
