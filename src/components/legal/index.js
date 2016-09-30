import React from 'react';

function Legal(props) {
  const {legalName} = props;

  return (
    <span className="legal">&copy; 2016 {legalName}. All rights reserved.</span>
  );
}

export default Legal;
