import { Coin, LCDClient, MsgDelegate } from '@terra-money/terra.js';
import { useConnectedWallet, useWallet } from '@terra-money/wallet-provider';
import { useState } from 'react';
import { ROCKX_VALIDATOR } from './config';

export function Stake() {
    const [amountToStake, setAmountToStake] = useState(0);
    const wallet = useConnectedWallet();

    const handleStake = async () => {
        if (!wallet)
            return;

        const msg = new MsgDelegate(wallet.walletAddress, ROCKX_VALIDATOR, new Coin('uluna', amountToStake));

        const { result, success } = await wallet.post({
            msgs: [msg],
            memo: 'Stake to Rock X',
        });
        console.log('Tx hash: %s, with error: %s', result.txhash, JSON.stringify(success));
    };

    const handleAmountChange = (event: any) => {
        setAmountToStake(Number(event.target.value));
    };

    return (
        <div>
            <label>
                Amount:
                <input onChange={handleAmountChange} type="text" />
            </label>
            <button onClick={handleStake} disabled={!wallet}>Stake</button>
        </div>
    )
}