import { SendOutlined } from '@ant-design/icons';
import { LoadingButton } from '@mui/lab';
import PropTypes from 'prop-types';

const MUIButton = ({ size, type, variant, color, label, isDisabled, isLoading, endIcon = <SendOutlined /> }) => {
  return (
    <LoadingButton
      disableElevation
      fullwidth="true"
      size={size}
      type={type}
      variant={variant}
      color={color}
      disabled={isDisabled}
      loading={isLoading}
      loadingPosition="end"
      endIcon={endIcon}
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
  endIcon: PropTypes.element
};

export default MUIButton;
