import { Alert, Button, Dialog, DialogActions, DialogContent } from "@mui/material";
import { createStyles, styled } from "@mui/styles";
import { FC } from 'react';
import useStake from "../api/useStake";

type Severity = 'success' | 'error'

export interface StakeStatusProps {
    message: string;
    open: boolean;
    severity: Severity;
    onClose: () => void;
}

const styles = createStyles({
    root: {
        maxWidth: 400,
        margin: "70px auto 0",
        position: "relative",
        transition: "margin 1s ease-out",
        // [theme.breakpoints.up(depositNavigationBreakpoint)]: {
        //   marginTop: 0,
        // },
    },
});

export const StakeStatus: FC<StakeStatusProps> = ({ message, open, severity, onClose }) => {
    return (<Dialog
        open={open}
        onClose={onClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth={true}
    >
        <DialogContent>
            {/* {!stake.error && !!stake.data && <Alert severity="success">Success</Alert>} */}
            {/* {severity === 'success' && <Alert severity={severity}>{message}</Alert>}
            {severity === 'error' && <Alert severity="error">{message}</Alert>} */}
            <Alert severity={severity}>{message}</Alert>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose} autoFocus>
                OK
            </Button>
        </DialogActions>
    </Dialog>)
}

export const StakeStatusWrapper = styled('div')({
    root: {
        maxWidth: 400,
        margin: "70px auto 0",
        position: "relative",
        transition: "margin 1s ease-out",
        // [theme.breakpoints.up(depositNavigationBreakpoint)]: {
        //   marginTop: 0,
        // },
    },
})
