// src/pages/_app.js
import PropTypes from 'prop-types';
import { AuthProvider } from '../utils/context/authContext';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppContext({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
}

export default AppContext;

AppContext.propTypes = {
  Component: PropTypes.shape(),
  pageProps: PropTypes.arrayOf(),
};
