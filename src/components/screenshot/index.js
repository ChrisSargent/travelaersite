import React from 'react';

function Screenshot(props) {
  return (
    <div className="screenshot">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 501 1018" xmlnsXlink="http://www.w3.org/1999/xlink">
        <g fill="#fff" fillRule="evenodd" transform="translate(0 2)">
          <rect width="491" height="1014" x="5" fillOpacity=".3" stroke="#fff" strokeWidth="4" rx="75"/>
          <rect width="6" height="75" x="495" y="215" rx="3"/>
          <rect width="6" height="41" y="128" rx="3"/>
          <rect width="6" height="75" y="215" rx="3"/>
          <rect width="6" height="75" y="307" rx="3"/>
          <circle cx="172" cy="64" r="8"/>
          <path d="M251 37c2.7614 0 5-2.2386 5-5s-2.2386-5-5-5-5 2.2386-5 5 2.2386 5 5 5zm-1 946c20.9868 0 38-17.0132 38-38s-17.0132-38-38-38-38 17.0132-38 38 17.0132 38 38 38zm0-3c19.33 0 35-15.67 35-35s-15.67-35-35-35-35 15.67-35 35 15.67 35 35 35z"/>
          <rect width="80" height="8" x="211" y="60" rx="4"/>
        </g>
        <image width="431" height="766" x="35" y="123" xlinkHref={props.image}/>
      </svg>
    </div>
  );
}

export default Screenshot;
