import PropTypes from 'prop-types';
import { forwardRef } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// @mui
import { Link } from '@mui/material';
import logo from '../../assets/img/logo.png';
// ----------------------------------------------------------------------

const Logo = forwardRef(({ disabledLink = false, sx, ...other }, ref) => {

  if (disabledLink) {
    return { logo };
  }

  return (
    <Link to="/" component={RouterLink} sx={{ display: 'contents' }}>
      <img width={60} height={60} src={logo} alt="Apna Market" />
    </Link>
  );
});

Logo.propTypes = {
  sx: PropTypes.object,
  disabledLink: PropTypes.bool,
};

export default Logo;
