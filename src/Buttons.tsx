import React from 'react';
import { Button, ButtonProps, styled } from '@mui/material';

export const ActionButton: React.FC<ButtonProps> = ({
    color = "primary",
    ...props
}) => {
    return (
        <Button
            sx={{ maxWidth: 360 }}
            variant="contained"
            size="large"
            fullWidth
            color={color}
            {...props}
        />
    );
};

export const ActionButtonWrapper = styled("div")(() => ({
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
}));
