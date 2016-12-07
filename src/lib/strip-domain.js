function stripDomain(url) {
  if (url && url.indexOf('http') >= 0) {
    url = url.replace(/^.*\/\/[^/]+/, '').replace('/wordpress', '');
  }
  return url;
}

export default stripDomain;
