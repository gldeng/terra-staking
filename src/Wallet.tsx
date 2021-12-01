import { BridgePurePaper, PaperContent, PaperHeader } from './components/Paper';
import { Route, Routes, useNavigate } from "react-router-dom";
import Staking from './Staking';
import Unstaking from './Unstaking';
import { TransactionTypeTabs } from './components/TransactionTypeTabs';
import { ConnectType, getChainOptions, useWallet, WalletControllerChainOptions, WalletProvider, WalletStatus } from '@terra-money/wallet-provider';
import { ActionButtonWrapper, ActionButton } from './components/Buttons';
import { MarkText } from './components/TypographyHelpers';
import { useEffect, useState } from 'react';
import { Alert, Button } from '@mui/material';
import * as features from './features';

const ConnectWallet = () => {
    const wallet = useWallet();
    const connected = wallet.status === WalletStatus.WALLET_CONNECTED;
    return <>
        <PaperHeader />
        <PaperContent topPadding bottomPadding darker>

            {!connected &&
                <ActionButtonWrapper>
                    <ActionButton color='success' onClick={() => wallet.connect(ConnectType.EXTENSION)} >Connect</ActionButton>
                </ActionButtonWrapper>
            }

            {connected &&
                <MarkText color={'orange'} >Already connected.</MarkText>
            }
        </PaperContent>
    </>;
}

const Wallet = () => {
    const navigate = useNavigate();
    const wallet = useWallet();
    const initializing = wallet.status === WalletStatus.INITIALIZING;
    const connected = wallet.status === WalletStatus.WALLET_CONNECTED;
    const needInstallExtension = wallet.availableInstallTypes.includes(ConnectType.EXTENSION);
    useEffect(() => {
        if (!initializing && !connected)
            if (wallet.availableConnectTypes.includes(ConnectType.EXTENSION))
                wallet.connect(ConnectType.EXTENSION);
        if (connected)
            navigate('stake');
    }, [wallet, connected, initializing]);

    return (<>
        {needInstallExtension &&
            <Alert severity={'error'}>
                {'Please install Terra Station Chrome Extension'}
                <Button onClick={() => wallet.install(ConnectType.EXTENSION)}>Install</Button>
            </Alert>
        }
        {connected && <BridgePurePaper>
            {features.unstaking && <TransactionTypeTabs />}
            <Routes>
                <Route path='stake' element={<Staking />} />
                {features.unstaking && <Route path='unstake' element={<Unstaking />} />}
            </Routes>
        </BridgePurePaper>}
    </>);
}

export default () => {

    const [chainOptions, setChainOptions] = useState<WalletControllerChainOptions | null>(null);

    useEffect(() => { if (!chainOptions) getChainOptions().then(value => setChainOptions(value)); });

    if (!chainOptions)
        return <></>;

    return (<WalletProvider {...chainOptions}>
        <Wallet />
    </WalletProvider>)
};
