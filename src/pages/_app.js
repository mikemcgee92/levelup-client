// src/pages/_app.js
import PropTypes from 'prop-types';
import { AuthProvider } from '../utils/context/authContext';
import ViewDirectorBasedOnUserAuthStatus from '../utils/context/ViewDirector';
import 'bootstrap/dist/css/bootstrap.min.css';

function AppContext({ Component, pageProps }) {
  return (
    <AuthProvider>
      <ViewDirectorBasedOnUserAuthStatus>
        <Component {...pageProps} />
      </ViewDirectorBasedOnUserAuthStatus>
    </AuthProvider>
  );
}

export default AppContext;

AppContext.propTypes = {
  Component: PropTypes.func.isRequired,
  pageProps: PropTypes.objectOf({}).isRequired,
};
