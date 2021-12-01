import React, { useEffect, useRef, useState } from 'react';
import { ConnectType, useWallet, WalletStatus } from '@terra-money/wallet-provider';
import { Button, ButtonProps, styled, Theme, ButtonGroup, Grid } from '@mui/material';
import { BigCurrencyInput } from './components/BigCurrencyInput';
import { LabelWithValue, MiddleEllipsisText } from './components/TypographyHelpers';
import { PaperContent } from './components/Paper';
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
        },
    },
});

const StyledToggleButtonGroup = withStyles(toggleButtonGroupStyles)(ButtonGroup);

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

const lunaToU = (luna: string | number) => math.times(new BigNumber(luna), new BigNumber(10).pow(6));
const uToLuna = (u: string | number) => format.amount(u, 6);

const WalletComponent: React.FC = () => {
    const wallet = useWallet();
    const { availableConnectTypes } = wallet;
    const connected = wallet.status === WalletStatus.WALLET_CONNECTED;
    const address = wallet.wallets[0]?.terraAddress ?? '';

    const stake = useStake();

    const bankExecuted = useRef(false);
    const bank = useBank();
    const { lunaBalance, handleStake } = (() => {
        const ulunaBalance = bank.data?.balance?.find(b => b.denom === 'uluna')?.delegatable ?? '0';
        return {
            lunaBalance: uToLuna(ulunaBalance),
            handleStake: () => stake.execute(lunaToU(lunaAmount)),
        };
    })();
    useEffect(() => {
        if (!bankExecuted.current) {
            bank.execute();
            bankExecuted.current = true;
        }
    });

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
            <LabelWithValue
                label="RockX Address"
                value={<CopyContentButton content={ROCKX_VALIDATOR} />}
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

export default WalletComponent
