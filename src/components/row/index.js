import React from 'react';
import Article from '../article';

require('./_row.sass');

function Row(props) {
  var columnsMap;
  const {columns} = props;

  if (columns) {
    columnsMap = columns.map((column, index) => {
      return (
        <li key={column.id || index} className="column">
          <Article {...column} />
        </li>
      );
    });

    return (
      <ul className="row-block">{columnsMap}</ul>
    );
  } else {
    return false;
  }

}

export default Row;
