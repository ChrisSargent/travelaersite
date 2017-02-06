import React from 'react'
import {image404} from '../../lib/utils'
import css from '../../lib/css'
import Section from '../../sections/section'
import Wysiwyg from '../../components/wysiwyg'
import './_error.sass'

const Error = () => {
  const compName = 'error'
  const overlap = [
    {
      type: 'single',
      position: 'bottom',
      colour: 'white'
    }
  ]

  const content = "Uh oh, there was an error and we couldn't find the page you were looking for. Please try one of the links above or chat with us using the green button below"

  return (
    <Section compName={compName} image={image404} skew="bottom" overlaps={overlap}>
      <div className={css.main + compName}>
        <h1 className={css.title}>SORRY!</h1>
        <Wysiwyg content={content} />
      </div>
    </Section>
  )
}

export default Error
