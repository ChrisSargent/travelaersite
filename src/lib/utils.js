import packageJson from '../../package.json'

export const globals = {
  baseUrl: process.env.NODE_ENV === `development`
    ? packageJson.proxy
    : packageJson.homepage,
  flagsUrl: '/assets/flags/',
  readMore: '\u00bb\xa0Read More'
}

// Use hardcoded info here - because if we're having an error, we might not be able to get the info dynamically.
const _filePath = '/wordpress/wp-content/uploads/2017/02/error-404-'
export const image404 = {
  description: `/9j/4AAQSkZJRgABAQAAAQABAAD//gA7Q1JFQVRPUjogZ2QtanBlZyB2MS4wICh1c2luZyBJSkcgSlBFRyB2ODApLCBxdWFsaXR5ID0gODIK/9sAQwAGBAQFBAQGBQUFBgYGBwkOCQkICAkSDQ0KDhUSFhYVEhQUFxohHBcYHxkUFB0nHR8iIyUlJRYcKSwoJCshJCUk/9sAQwEGBgYJCAkRCQkRJBgUGCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQkJCQk/8AAEQgADQAUAwEiAAIRAQMRAf/EAB8AAAEFAQEBAQEBAAAAAAAAAAABAgMEBQYHCAkKC//EALUQAAIBAwMCBAMFBQQEAAABfQECAwAEEQUSITFBBhNRYQcicRQygZGhCCNCscEVUtHwJDNicoIJChYXGBkaJSYnKCkqNDU2Nzg5OkNERUZHSElKU1RVVldYWVpjZGVmZ2hpanN0dXZ3eHl6g4SFhoeIiYqSk5SVlpeYmZqio6Slpqeoqaqys7S1tre4ubrCw8TFxsfIycrS09TV1tfY2drh4uPk5ebn6Onq8fLz9PX29/j5+v/EAB8BAAMBAQEBAQEBAQEAAAAAAAABAgMEBQYHCAkKC//EALURAAIBAgQEAwQHBQQEAAECdwABAgMRBAUhMQYSQVEHYXETIjKBCBRCkaGxwQkjM1LwFWJy0QoWJDThJfEXGBkaJicoKSo1Njc4OTpDREVGR0hJSlNUVVZXWFlaY2RlZmdoaWpzdHV2d3h5eoKDhIWGh4iJipKTlJWWl5iZmqKjpKWmp6ipqrKztLW2t7i5usLDxMXGx8jJytLT1NXW19jZ2uLj5OXm5+jp6vLz9PX29/j5+v/aAAwDAQACEQMRAD8A+l47iMDl1H40r3URUkOD9DXI6XrT3UF1K0QHkOwAz94D8KSbX5Y/skohj2zAtt54wR3oA3z9pE0p8klWYFeQONo/rmismeaAuGMDksAT+/f/ABopgf/Z`,
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

export const getRequestedSlug = (pathname) => {
  const pathnameArray = pathname.split('/')
  const requestedSlug = pathnameArray[pathnameArray.length - 2] || 'home'
  return requestedSlug
}

export const dateFormat = (date, includeTime) => {
  var dateString,
    dateOptions,
    timeOptions

  if (!date)
    return date

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

export const trimContent = (content, paras = 1) => {
  if (!content)
    return content
  var excerpt = content.split('</p>', paras)
  return excerpt.join('')
}

export const splitExcerpt = (content) => {
  if (!content)
    return content

  content = content.split('<p><!--more--></p>')

  if (content.length > 1) {
    content = {
      excerpt: content[0],
      content: content[1]
    }
  } else {
    content = {
      excerpt: false,
      content: content[0]
    }
  }
  return content
}

export const whichContent = (content) => {
  if (!content)
    return content
  return content.rendered !== undefined ? content.rendered : content
}

export const convertLinks = (content) => {
  if (!content)
    return content
  return content.replace(new RegExp('href="' + globals.baseUrl, 'g'), 'href="');
}

export const stripTags = (html) => {
  // Used for stripping html tags out of meta descriptions etc.
  if (!html)
    return html
  return html.replace(/<\/?[^>]+(>|$)/g, "");
}

export const toRelative = (url) => {
  const {baseUrl} = globals
  if (url && url.includes(baseUrl)) {
    url = url.replace(baseUrl, '')
    url === '' && (url = '/')
  }
  return url
}
