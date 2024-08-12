import React, { forwardRef } from 'react';
import { OutlinedInput, InputLabel, FormHelperText } from '@mui/material';

const MUITextField = forwardRef(({
    label,
    name,
    type,
    value,
    onBlur,
    onChange,
    placeholder,
    multiline,
    fullWidth,
    rows,
    helperText,
    error,
    inputProps,
}, ref) => {

    //console.log('Ref in MUITextField:', ref); // Check ref assignment

    return (
        <>
            <InputLabel htmlFor={name}>{label}</InputLabel>
            <OutlinedInput
                name={name}
                placeholder={placeholder}
                type={type}
                value={value}
                onBlur={onBlur}
                onChange={onChange}
                fullWidth={fullWidth}
                multiline={multiline}
                rows={rows}
                error={error}
                inputProps={inputProps}
                ref={ref} // Forward the ref to OutlinedInput
            />
            {helperText && (
                <FormHelperText error={error}>{helperText}</FormHelperText>
            )}
        </>
    );
});

export default MUITextField;
