import React, { useEffect, useState } from 'react';
import { ConnectType, useWallet, WalletControllerChainOptions, WalletStatus } from '@terra-money/wallet-provider';
import { Input, ExitToApp } from '@mui/icons-material';
import { Box, Button, ButtonProps, Paper, Toolbar, styled, Typography, Link } from '@mui/material';
import { Stake } from './Stake';
import { BigCurrencyInput } from './BigCurrencyInput';
import {
    WalletProvider,
    getChainOptions,
} from '@terra-money/wallet-provider';
import { LabelWithValue, MiddleEllipsisText } from './TypographyHelpers';
import { PaperContent, PaperHeader } from './Paper';

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

    const [amount, setAmount] = useState(0);
    if (!availableConnectTypes.includes(ConnectType.EXTENSION))
        return <></>;
    return <>
        <PaperHeader />
        <PaperContent topPadding bottomPadding darker>
            <Box pr={3} />
            <LabelWithValue
                label="Your Address"
                value={<MiddleEllipsisText>{wallet.wallets[0]?.terraAddress}</MiddleEllipsisText>}
            />

            <LabelWithValue
                label="RockX Address"
                value={<MiddleEllipsisText>{wallet.wallets[0]?.terraAddress}</MiddleEllipsisText>}
            />
            <BigCurrencyInputWrapper>
                <BigCurrencyInput
                    onChange={() => { }}
                    symbol={'uluna'}
                    usdValue={'NA'}
                    value={amount}
                    errorText={''}
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
                    <ActionButton onClick={() => { }} >Stake</ActionButton>
                </ActionButtonWrapper>
            }
            {/* {connected && <>{wallet.wallets[0]?.terraAddress}<DisconnectButton /></>} */}
        </PaperContent>
    </>;
}

const PaperWrapper = styled('div')({
    maxWidth: '600px',
    margin: '70px auto 0',
    position: 'relative',
});

export default () => {

    const [chainOptions, setChainOptions] = useState<WalletControllerChainOptions | null>(null);

    useEffect(() => { if (!chainOptions) getChainOptions().then(value => setChainOptions(value)); });

    if (!chainOptions)
        return <></>;

    return (<PaperWrapper>
        <WalletProvider {...chainOptions}>
            <WalletComponent />
        </WalletProvider>
    </PaperWrapper>)
};
