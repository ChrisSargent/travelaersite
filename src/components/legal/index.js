import React from 'react';

require('./_legal.sass');

function Legal(props) {
  const {legalName} = props;

  return (
    <div className="legal">&copy; 2016 {legalName}. All rights reserved.</div>
  );
}

export default Legal;
