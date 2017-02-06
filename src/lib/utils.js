import packageJson from '../../package.json'

export const globals = {
  wpFolder: process.env.NODE_ENV === `development` ? packageJson.proxy + packageJson.wpFolder : packageJson.homepage + packageJson.wpFolder,
  homeUrl: '/',
  blogUrl: '/blog/',
  companyUrl: '/company/',
  productsUrl: '/products/',
  contactUrl: '/contact-us/',
  flagsUrl: '/assets/flags/',
  homeID: 5
}

// Use hardcoded info here - because if we're having an error, we might not be able to get the info dynamically.
const _filePath = packageJson.wpFolder + '/wp-content/uploads/2017/02/error-404-'
export const image404 = {
  description: '/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2ODApLCBxdWFsaXR5ID0gODIK/9sAQwAGBAQFBAQGBQUFBgYGBwkOCQkICAkSDQ0KDhUSFhYVEhQUFxohHBcYHxkUFB0nHR8iIyUlJRYcKSwoJCshJCUk/9sAQwEGBgYJCAkRCQkRJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk/8AAEQgADQAUAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+l47iMDl1H40r3URUkOD9DXI6XrT3UF1K0QHkOwAz94D8KSbX5Y/skohj2zAtt54wR3oA3z9pE0p8klWYFeQONo/rmismeaAuGMDksAT+/f/ABopgf/Z',
  sizes: {
    'medium': _filePath + '400x267.jpg',
    'medium-width': 400,
    'medium_large': _filePath + '768x512.jpg',
    'medium_large-width': 768,
    'post-thumbnail': _filePath + '1200x800.jpg',
    'post-thumbnail-width': 1200,
    'large': _filePath + '1600x1067.jpg',
    'large-width': 1600
  },
  alt: 'Sorry, there was an error'
}

export const stripDomain = (url) => {
  const {wpFolder} = globals
  if (url && url.includes(wpFolder)) {
    url = url.replace(wpFolder, '')
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
  content = content.replace(new RegExp('href="' + globals.wpFolder, 'g'), 'href="');
  return content
}
