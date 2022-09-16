module.exports = {
  style: {
    postcss: {
      plugins: [require('tailwindcss'), require('autoprefixer')],
    },
  },
};

// craco.config.js
// module.exports = {
//   style: {
//     postOptions: {
//       plugins: [require('tailwindcss'), require('autoprefixer')],
//     },
//   },
// };
