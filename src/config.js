//export const BASE_URL = 'https://express-hello-world-ok4t.onrender.com';
//export const BASE_URL = 'http://localhost:8000';
// config.js



// Development environment
/*
if (process.env.NODE_ENV === 'development') {
    module.exports = {
        BASE_URL: process.env.REACT_APP_BASE_URL || 'http://localhost:8000'
    };
}

// Production environment
else if (process.env.NODE_ENV === 'production') {
    module.exports = {
        BASE_URL: process.env.REACT_APP_BASE_URL || 'https://express-hello-world-ok4t.onrender.com'
    };
}
*/

// kubernetes settings

const BASE_URL = process.env.BASE_URL ; //|| 'http://localhost:8000';

// Use BASE_URL in your application code
console.log(BASE_URL)

module.exports = {
  BASE_URL,
};