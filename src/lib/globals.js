import axios from 'axios';

module.exports = {
  homeUrl: '/',
  blogUrl: '/blog',
  companyUrl: '/company',
  productsUrl: '/products',
  contactUrl: '/contact-us',
  flagsUrl: '/assets/flags/',
};


if(process.env.NODE_ENV === 'development') {
  axios.defaults.baseURL = 'http://travelaersite.dev/wordpress/wp-json';
} else {
  axios.defaults.baseURL = 'http://travelaer.stickypixel.com/wordpress/wp-json';
}
