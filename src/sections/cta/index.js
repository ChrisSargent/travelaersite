import React from 'react'
import Link from 'react-router/lib/Link'
import css from '../../lib/css'
import Section from '../../sections/section'
import './_cta.sass'

const CTA = ({compName}) => {
  const overlap = [
    {
      type: 'single',
      position: 'bottom',
      colour: 'blue'
    }
  ]
  return (
    <Section compName={compName} skew="both" overlaps={overlap} >
      <div className={css.main + compName}>
        <h1 className={css.title}>Ready to journey with us?</h1>
        <Link to="/contact-us" className="link">» Talk to us now.</Link>
      </div>
    </Section>
  )
}

export default CTA
