import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ConnectType, useConnectedWallet, useWallet, WalletControllerChainOptions, WalletStatus } from '@terra-money/wallet-provider';
import { Input, ExitToApp } from '@mui/icons-material';
import { Box, Button, ButtonProps, Paper, Toolbar, styled, Typography, Link, Theme, ButtonGroup, ToggleButton, Grid, Alert, Dialog, DialogTitle, DialogContent, DialogActions } from '@mui/material';
// import { Stake } from './Stake';
import { BigCurrencyInput } from './components/BigCurrencyInput';
import {
    WalletProvider,
    getChainOptions,
} from '@terra-money/wallet-provider';
import { LabelWithValue, MiddleEllipsisText } from './components/TypographyHelpers';
import { PaperContent, PaperHeader } from './components/Paper';
import { LCDClient } from '@terra-money/terra.js';
import useBank from './api/useBank';
import * as format from './utils/format';
import { AssetInfo } from './components/TypographyHelpers';
import { LunaFullIcon } from './components/Icons';
import * as math from './utils/math';
import BigNumber from 'bignumber.js'
import { createStyles, withStyles } from '@mui/styles';
import * as customColors from './theme/colors';
import { ROCKX_VALIDATOR } from './config';
import useStake from './api/useStake';
import { StakeStatus, StakeStatusProps, StakeStatusWrapper } from './components/StakeStatus';
import { CopyContentButton } from './components/Buttons';

// const transition = "all 1s ease-out, border 0.5s ease-out";
const depositNavigationBreakpoint = "md";

const toggleButtonGroupStyles = (theme: Theme) => createStyles({
    root: {
        //   transition,
        [theme.breakpoints.up(depositNavigationBreakpoint)]: {
            background: customColors.whiteDarker,
            borderRadius: 15,
            borderColor: customColors.rockxBlue,
            borderWidth: 'thin',
        },
        // margin: '0 auto',
    },
    grouped: {
        //   transition,
        [theme.breakpoints.up(depositNavigationBreakpoint)]: {
            border: "solid",
            borderColor: customColors.rockxBlue,
            borderWidth: 'thin',
            "&:first-child": {
                borderTopLeftRadius: 15,
                borderBottomLeftRadius: 15,
            },
            "&:last-child": {
                borderTopRightRadius: 15,
                borderBottomRightRadius: 15,
            },
            // "&:only-child": {
            //     borderBottomLeftRadius: 20,
            //     borderBottomRightRadius: 20,
            // },
            // "&:not(:first-child)": {
            //     borderRadius: 46,
            //     marginLeft: 12,
            //     marginRight: 12,
            //     marginTop: 12,
            // },
            // "&:last-child:not(:only-child)": {
            //     marginBottom: 12,
            // },
        },
    },
});

const StyledToggleButtonGroup = withStyles(toggleButtonGroupStyles)(ButtonGroup);

const ButtonGroupWrapper = styled('div')({
    // position:'center'
    justifyContent: 'center'
})

const ActionButton: React.FC<ButtonProps> = ({
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
const ActionButtonWrapper = styled("div")(() => ({
    marginTop: 20,
    display: "flex",
    justifyContent: "center",
    flexDirection: "row",
}));
const BigCurrencyInputWrapper = styled("div")({
    marginTop: 40,
});

const Address: React.FC = () => {
    const wallet = useWallet();
    const Wrapper = styled('div')({
        padding: '0 40 40 40',
    });
    return <Wrapper>
        <Typography variant="body1" align="center">
            {wallet.wallets[0]?.terraAddress}
        </Typography>
        <Button />
    </Wrapper>;
};

const DisconnectButton: React.FC = () => {
    const wallet = useWallet();
    return <button onClick={() => wallet.disconnect()} className="btn-icon">
        <ExitToApp />
    </button>;
}

const ConnectButton: React.FC = () => {
    const wallet = useWallet();
    return <button onClick={() => wallet.connect(ConnectType.EXTENSION)} className="btn-primary btn-sm">
        Connect
    </button>;
}

const WalletComponent: React.FC = () => {
    const wallet = useWallet();
    const { availableConnectTypes } = wallet;
    const connected = wallet.status === WalletStatus.WALLET_CONNECTED;
    const address = wallet.wallets[0]?.terraAddress ?? '';

    const connectedWallet = useConnectedWallet();
    const { chainID, lcd: URL } = connectedWallet?.network ?? { chainID: "", lcd: "" };
    // const [balance, setBalance] = useState("NA");
    const [bankLoading, setBankLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [closed, setClosed] = useState(false);
    const stake = useStake();
    // const openDialog = !closed && !stake.loading && sent;
    const openDialog = true;

    const bankExecuted = useRef(false);
    const bank = useBank();
    const ulunaBalance = bank.data?.balance?.find(b => b.denom === 'uluna')?.delegatable ?? '0';
    const lunaBalance = format.amount(ulunaBalance, 6);
    useEffect(() => {
        if (!bankExecuted.current) {
            bank.execute();
            bankExecuted.current = true;
        }
    });
    const handleStake = () => {
        const uluna = math.times(new BigNumber(lunaAmount), new BigNumber(10).pow(6));
        stake.execute(uluna);
        setSent(true);
    }
    const [lunaAmount, setLunaAmount] = useState(0);
    const [percentage, setPercentage] = useState("0%");
    const [errorText, setErrorText] = useState("");
    const checkAndSetAmount = (value: number) => {
        setLunaAmount(value);
        const x = math.div(new BigNumber(value), new BigNumber(lunaBalance));
        const pct = math.percent(x === 'NaN' ? 0 : x);
        setPercentage(pct);
        if (math.gt(new BigNumber(value), new BigNumber(lunaBalance)))
            setErrorText("Insufficient fund");
        else
            setErrorText("");
    }
    const presetValue = (pct: number) => {
        const value = parseFloat(math.times(new BigNumber(pct), new BigNumber(lunaBalance)));
        setLunaAmount(value);
    }
    if (!availableConnectTypes.includes(ConnectType.EXTENSION))
        return <></>;
    const statusProps: StakeStatusProps = {
        open: !stake.loading && !stake.noted,
        message: !!stake.error ? "Failed: " + stake.error : "Success",
        severity: !!stake.error ? "error" : "success",
        onClose: () => { stake.setNoted(true); bank.execute(); },
    }
    return <>
        <StakeStatusWrapper>
            <StakeStatus  {...statusProps} />
        </StakeStatusWrapper>
        <PaperContent topPadding bottomPadding darker>
            <LabelWithValue
                label="Your Address"
                value={<MiddleEllipsisText>{address}</MiddleEllipsisText>}
            />
            {/* <LabelWithValue
                label="RockX Address"
                value={<MiddleEllipsisText>{ROCKX_VALIDATOR}</MiddleEllipsisText>}
            />   */}
             <LabelWithValue
                label="RockX Address"
                value={<CopyContentButton content={ROCKX_VALIDATOR}/>}
            />         
            <AssetInfo
                label={"Available to Stake"}
                value={`${lunaBalance} Luna`}
                Icon={<LunaFullIcon fontSize="inherit" />}
            />
            <Grid container justifyContent="center">
                <Grid item xs={8}>
                    <StyledToggleButtonGroup >
                        <Button onClick={() => { presetValue(0.25) }}>25%</Button>
                        <Button onClick={() => { presetValue(0.5) }}>50%</Button>
                        <Button onClick={() => { presetValue(0.75) }}>75%</Button>
                        <Button onClick={() => { presetValue(1) }}>100%</Button>
                    </StyledToggleButtonGroup>
                </Grid>
            </Grid>
            <BigCurrencyInputWrapper>
                <BigCurrencyInput
                    onChange={checkAndSetAmount}
                    symbol={'Luna'}
                    usdValue={percentage}
                    value={lunaAmount}
                    errorText={errorText}
                />
            </BigCurrencyInputWrapper>

            {!connected &&
                <ActionButtonWrapper>
                    <ActionButton onClick={() => wallet.connect(ConnectType.EXTENSION)} >Connect</ActionButton>
                </ActionButtonWrapper>
            }

            {/* <Stake /> */}
            {connected &&
                <ActionButtonWrapper>
                    <ActionButton disabled={!!errorText} onClick={handleStake} >Stake</ActionButton>
                </ActionButtonWrapper>
            }
        </PaperContent>
    </>;
}

const PaperWrapper = styled('div')({
    maxWidth: '600px',
    margin: '30px auto 0',
    position: 'relative',
});

// export default () => {

//     const [chainOptions, setChainOptions] = useState<WalletControllerChainOptions | null>(null);

//     useEffect(() => { if (!chainOptions) getChainOptions().then(value => setChainOptions(value)); });

//     if (!chainOptions)
//         return <></>;

//     return (
//     <PaperWrapper>
//         {/* <WalletProvider {...chainOptions}> */}
//         <WalletComponent />
//         {/* </WalletProvider> */}
//      </PaperWrapper>
//     )
// };
export default WalletComponent
