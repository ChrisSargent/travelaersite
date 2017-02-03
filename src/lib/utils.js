import packageJson from '../../package.json'

export const globals = {
  siteURL: process.env.NODE_ENV === `development` ? packageJson.proxy : packageJson.homepage,
  homeUrl: '/',
  blogUrl: '/blog',
  companyUrl: '/company',
  productsUrl: '/products',
  contactUrl: '/contact-us',
  flagsUrl: '/assets/flags/',
  homeID: 5
}

export const stripDomain = (url) => {
  const {siteURL} = globals
  if (url && url.includes(siteURL)) {
    url = url.replace(siteURL, '')
    url.substr(-1) === '/' && (url = url.substr(0, url.length - 1))
    url === '' && (url = '/')
  }
  return url
}

export const getRequestedSlug = (pathname) => {
  var requestedSlug
  const pathnameArray = pathname.split('/')
  requestedSlug = pathnameArray[pathnameArray.length - 1] || 'home'
  return requestedSlug
}

export const dateFormat = (date, includeTime) => {
  var dateString,
    dateOptions,
    timeOptions

  // Convert the date to UTC if not already in it
  !date.includes('T') && (date += ' UTC')

  date = new Date(date)
  dateOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  }
  dateString = date.toLocaleString(navigator.language, dateOptions)

  if (includeTime) {
    timeOptions = {
      hour12: true,
      hour: 'numeric',
      minute: 'numeric'
    }
    dateString += ' at ' + date.toLocaleTimeString(navigator.language, timeOptions)
  }

  return dateString
}

export const trimContent = (content, paras) => {
  var excerpt = content.split('</p>', paras)
  return excerpt.join('')
}

export const convertAtoLink = (content) => {
  console.log(content);
  return content
}
