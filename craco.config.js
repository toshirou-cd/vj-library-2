const path = require('path');

module.exports = {
  plugins: [{ plugin: require('@semantic-ui-react/craco-less') }],
  webpack: {
    alias: {
      '@app': path.resolve(__dirname, 'src/app'),
      '@admin': path.resolve(__dirname, 'src/admin'),
      '@csyt': path.resolve(__dirname, 'src/csyt'),
      '@pqm': path.resolve(__dirname, 'src/pqm'),
      '@authorize': path.resolve(__dirname, 'src/authorize'),
      '@assets': path.resolve(__dirname, 'src/app/assets'),
      '@components': path.resolve(__dirname, 'src/app/components'),
      //style
      '@variables': path.resolve(
        __dirname,
        'src/app/assets/styles/variables.less',
      ),
    },
  },
};
