import packageJson from '../../package.json'

export const globals = {
  siteUrl: process.env.NODE_ENV === `development` ? packageJson.proxy + '/wordpress' : packageJson.homepage + '/wordpress',
  homeUrl: '/',
  blogUrl: '/blog/',
  companyUrl: '/company/',
  productsUrl: '/products/',
  contactUrl: '/contact-us/',
  flagsUrl: '/assets/flags/',
  homeID: 5
}

export const stripDomain = (url) => {
  const siteUrl = globals.siteUrl
  if (url && url.includes(siteUrl)) {
    url = url.replace(siteUrl, '')
    url === '' && (url = '/')
  }
  return url
}

export const getRequestedSlug = (pathname) => {
  const pathnameArray = pathname.split('/')
  const requestedSlug = pathnameArray[pathnameArray.length - 2] || 'home'
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

export const convertLinks = (content) => {
  content = content.replace(new RegExp('href="' + globals.siteUrl, 'g'), 'href="');
  return content
}
