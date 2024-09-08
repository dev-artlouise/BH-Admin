import { SendRounded } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';

const MUIButton = ({ size, type, variant, color, label, isDisabled, isLoading, endIcon, onClick }) => {
  return (
    <LoadingButton
      disableElevation
      fullwidth
      size={size}
      type={type}
      variant={variant}
      color={color}
      disabled={isDisabled}
      loading={isLoading}
      loadingPosition="end"
      endIcon={endIcon}
      onClick={onClick}
    >
      {label}
    </LoadingButton>
  );
};

// Define prop types
MUIButton.propTypes = {
  size: PropTypes.oneOf(['small', 'medium', 'large']),
  type: PropTypes.oneOf(['button', 'submit', 'reset']),
  variant: PropTypes.oneOf(['text', 'outlined', 'contained']),
  color: PropTypes.oneOf(['default', 'inherit', 'primary', 'secondary']),
  isLoading: PropTypes.bool,
  label: PropTypes.string.isRequired,
  isDisabled: PropTypes.bool,
  endIcon: PropTypes.element,
  onClick: PropTypes.func
};

// Default props
MUIButton.defaultProps = {
  size: 'small',
  type: 'button',
  variant: 'contained',
  color: 'primary',
  isLoading: false,
  isDisabled: false
};

export default MUIButton;
