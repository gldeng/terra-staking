import { BridgePurePaper, PaperContent, PaperHeader } from './Paper';
import { Route, Routes } from "react-router-dom";
import Staking from './Staking';
import Unstaking from './Unstaking';
import { TransactionTypeTabs } from './TransactionTypeTabs';
import { ConnectType, getChainOptions, useWallet, WalletControllerChainOptions, WalletProvider, WalletStatus } from '@terra-money/wallet-provider';
import {ActionButtonWrapper, ActionButton} from './Buttons';
import { MarkText } from './TypographyHelpers';
import { useEffect, useState } from 'react';

const ConnectWallet = () => {
    const wallet = useWallet();
    const connected = wallet.status === WalletStatus.WALLET_CONNECTED;
    return <>
    <PaperHeader />
    <PaperContent topPadding bottomPadding darker>
 
        {!connected &&
            <ActionButtonWrapper>
                <ActionButton color='secondary' onClick={() => wallet.connect(ConnectType.EXTENSION)} >Connect</ActionButton>
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
    {/* <TransactionTypeTabs/> */}
    <ConnectWallet/>
        <Routes>
            <Route path='stake' element={<Staking />}/>
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
        <Wallet/>
    </WalletProvider>)
};
