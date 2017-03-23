import React from 'react'
import './_svg-filters.sass'

const SVGFilters = () => {
  // See: http://blog.andresgalante.com/RGBAtoFeColorMatrix/
  // Blue: $co--blue--lt: #0092c0
  // Violet: $co--blue-vio: #333967
  // Grey: $co--blue-grey--md: #5b6b84
  // Yellow Green: $co--yelgreen: #6da54c
  // Teal: $co--teal: #00a387
  // Note that the spacing of the matrix and line breaks is important

  return (
    <svg xmlns="http://www.w3.org/2000/svg" xmlnsXlink="http://www.w3.org/1999/xlink" className="svg-filters" aria-hidden="true">
      <defs>
        <filter id="filter-bw">
          <feColorMatrix type="matrix" colorInterpolationFilters="sRGB"
            values="0    1    0    0.3  0
                    0    1    0    0.3  0
                    0    1    0    0.3  0
                    0    1    0    1    0    "/>
        </filter>
        <filter id="filter-blue">
          <feColorMatrix colorInterpolationFilters="sRGB" type="matrix"
            values="0    0    0    0    0
                    0    0.57 0    0    0
                    0    0    0.75 0    0
                    0    0    0    1    0 "/>
        </filter>
        <filter id="filter-violet">
          <feColorMatrix colorInterpolationFilters="sRGB" type="matrix"
            values="0.2  0    0    0    0
                    0    0.22 0    0    0
                    0    0    0.4  0    0
                    0    0    0    1    0 "/>
        </filter>
        <filter id="filter-grey">
          <feColorMatrix colorInterpolationFilters="sRGB" type="matrix"
            values="0.36 0    0    0    0
                    0    0.42 0    0    0
                    0    0    0.52 0    0
                    0    0    0    1    0 "/>
        </filter>
        <filter id="filter-yellowgreen">
          <feColorMatrix colorInterpolationFilters="sRGB" type="matrix"
            values="0.43 0    0    0    0
                    0    0.65 0    0    0
                    0    0    0.3  0    0
                    0    0    0    1    0 "/>
        </filter>
        <filter id="filter-teal">
          <feColorMatrix colorInterpolationFilters="sRGB" type="matrix"
            values="0    0    0    0    0
                    0    0.64 0    0    0
                    0    0    0.53 0    0
                    0    0    0    1    0 "/>
        </filter>
      </defs>
    </svg>
  )
}

export default SVGFilters
