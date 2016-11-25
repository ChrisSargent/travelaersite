# CSS Class Naming Conditions

- In general this project adheres to: http://rscss.io/.
- Prefer Mixins over extends or modifier classes
- Each component has it's own SASS file with it's own styles wholly contained within.
- Common SASS components such as variables, mixins and resets are in the `src/lib/sass` folder


Most html mark up is like this

## Sections
- Classname = `sect-xxx`
Section (always full screen width)
-- Container (defines max-width, margins and section padding)

- Components
- Classname - `comp-xxx`
Component
