import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
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
import { StakeStatus, StakeStatusProps, StakeStatusWrapper } from './components/StakeStatus';
import { DelegationDropdown } from './components/DelegationDropdown';
import useUnstake from './api/useUnstake';

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
const uToLuna = (u: string) => format.amount(u, 6);

const WalletComponent: React.FC = () => {
    const wallet = useWallet();
    const { availableConnectTypes } = wallet;
    const connected = wallet.status === WalletStatus.WALLET_CONNECTED;
    const address = wallet.wallets[0]?.terraAddress ?? '';

    const unstake = useUnstake();
    const [validatorAddress, setValidatorAddress] = useState("");
    const [lunaAmount, setLunaAmount] = useState(0);
    const [percentage, setPercentage] = useState("0%");
    const [errorText, setErrorText] = useState("");

    const bankExecuted = useRef(false);
    const bank = useBank();
    const lunaStaked = useMemo(
        () => {
            const ulunaStaked = bank?.data?.delegations?.find(delegation => delegation.validator_address == validatorAddress)?.amount ?? '0';
            return uToLuna(ulunaStaked);
        }, [bank, validatorAddress, unstake.noted]
    );
    const handleUnstake = useCallback(()=> unstake.execute({
        validatorAddress: validatorAddress,
        ulunaAmount: lunaToU(lunaAmount),
    }), [unstake, validatorAddress, lunaAmount]);

    useEffect(() => {
        if (!bankExecuted.current) {
            bank.execute();
            bankExecuted.current = true;
        }
    });

    const selectValidator = (validator: string) => {
        setValidatorAddress(validator);
        setLunaAmount(0);
    }

    const checkAndSetAmount = (value: number) => {
        setLunaAmount(value);
        const x = math.div(new BigNumber(value), new BigNumber(lunaStaked));
        const pct = math.percent(x === 'NaN' ? 0 : x);
        setPercentage(pct);
        if (math.gt(new BigNumber(value), new BigNumber(lunaStaked)))
            setErrorText("Insufficient fund");
        else
            setErrorText("");
    }
    const presetValue = (pct: number) => {
        const value = parseFloat(math.times(new BigNumber(pct), new BigNumber(lunaStaked)));
        setLunaAmount(value);
    }
    if (!availableConnectTypes.includes(ConnectType.EXTENSION))
        return <></>;
    const statusProps: StakeStatusProps = {
        open: !unstake.loading && !unstake.noted,
        message: !!unstake.error ? "Failed: " + unstake.error : "Success",
        severity: !!unstake.error ? "error" : "success",
        onClose: () => { unstake.setNoted(true); bank.execute(); setLunaAmount(0); },
    }
    return <>
        <StakeStatusWrapper>
            <StakeStatus  {...statusProps} />
        </StakeStatusWrapper>
        <PaperContent topPadding bottomPadding darker>
            <LabelWithValue
                label="Network"
                value={`${wallet.network.name}: ${wallet.network.chainID}`}
            />
            <LabelWithValue
                label="Your Address"
                value={<MiddleEllipsisText>{address}</MiddleEllipsisText>}
            />

            {!!bank.data?.delegations && <LabelWithValue
                label="Validator Address"
                value={<DelegationDropdown delegations={bank.data.delegations} value={validatorAddress} onChange={event => selectValidator(event.target.value as any)} />}
            />}
            <AssetInfo
                label={"Total Staked"}
                value={`${lunaStaked} Luna`}
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

            <ActionButtonWrapper>
                <ActionButton disabled={!!errorText || !validatorAddress} onClick={handleUnstake} color={'error'} >Unstake</ActionButton>
            </ActionButtonWrapper>

        </PaperContent>
    </>;
}

export default WalletComponent
