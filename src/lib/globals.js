import axios from 'axios';

module.exports = {
  homeUrl: '/',
  blogUrl: '/blog',
  companyUrl: '/company',
  productsUrl: '/products',
};


// axios.defaults.baseURL = 'http://travelaer.stickypixel.com/wordpress/wp-json',
axios.defaults.baseURL = 'http://travelaersite.dev/wordpress/wp-json';
