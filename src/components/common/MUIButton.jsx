import { Button } from "@mui/material"

const MUIButton = ({
    size,
    type,
    variant,
    color,
    label
}) => {
    return (
        <Button
            disableElevation
            fullwidth
            size={size}
            type={type}
            variant={variant}
            color={color}
        >
            {label}
        </Button>

    )
}

export default MUIButton
