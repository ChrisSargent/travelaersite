function stripDomain(url) {
  if (url && url.indexOf('http') >= 0) {
    url = url.replace(/^.*\/\/[^/]+/, '').replace('/wordpress', '');
  }
  if (url && url.substr(-1) === '/') {
    url = url.substr(0, url.length - 1);
  }
  return url;
}

export default stripDomain;
