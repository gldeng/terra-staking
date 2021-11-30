import { Coin, LCDClient, MsgDelegate } from '@terra-money/terra.js';
import { useWallet } from '@terra-money/wallet-provider';
import { useState, useCallback } from 'react'
import { useAddress } from './useAddress';
import { ROCKX_VALIDATOR } from '../config';

export default () => {
    const wallet = useWallet();
    const address = useAddress();
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)
    const execute = useCallback(async (ulunaAmount) => {
        try {
            setLoading(true)
            setError(null)
            if (!wallet)
                setError('No valid wallet.');
            const msg = new MsgDelegate(address, ROCKX_VALIDATOR, new Coin('uluna', ulunaAmount));

            const { result, success } = await wallet.post({
                msgs: [msg],
                memo: 'Stake to Rock X',
            });
            console.log('Tx hash: %s, with error: %s', result.txhash, JSON.stringify(success));
            setData(data)
        } catch (error: any) {
            setError(error)
        }
        // eslint-disable-next-line
    }, [address, wallet])

    return { data, loading, error, execute }
}
