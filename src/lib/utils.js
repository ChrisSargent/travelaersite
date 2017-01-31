export const stripDomain = (url) => {
  if (url && url.indexOf('http') >= 0) {
    url = url.replace(/^.*\/\/[^/]+/, '').replace('/wordpress', '')
  }
  if (url && url.length > 1 && url.substr(-1) === '/') {
    url = url.substr(0, url.length - 1)
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

export const globals = {
  homeUrl: '/',
  blogUrl: '/blog',
  companyUrl: '/company',
  productsUrl: '/products',
  contactUrl: '/contact-us',
  flagsUrl: '/assets/flags/',
  homeID: 5
}
