import { BridgePurePaper, PaperContent, PaperHeader } from './components/Paper';
import { Route, Routes } from "react-router-dom";
import Staking from './Staking';
import Unstaking from './Unstaking';
import { TransactionTypeTabs } from './components/TransactionTypeTabs';
import { ConnectType, getChainOptions, useWallet, WalletControllerChainOptions, WalletProvider, WalletStatus } from '@terra-money/wallet-provider';
import { ActionButtonWrapper, ActionButton } from './components/Buttons';
import { MarkText } from './components/TypographyHelpers';
import { useEffect, useState } from 'react';

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
    const wallet = useWallet();
    const connected = wallet.status === WalletStatus.WALLET_CONNECTED;
    return (
        <BridgePurePaper>
            {!connected && <ConnectWallet />}
            {connected && <TransactionTypeTabs />}
            <Routes>
                <Route path='stake' element={<Staking />} />
                <Route path='unstake' element={<Unstaking />} />
            </Routes>
        </BridgePurePaper>)
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
