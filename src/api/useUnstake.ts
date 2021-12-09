import { Coin, MsgUndelegate } from '@terra-money/terra.js';
import { useWallet } from '@terra-money/wallet-provider';
import { useState, useCallback, FC } from 'react'
import { useAddress } from './useAddress';

export default () => {
    const wallet = useWallet();
    const address = useAddress();
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState<boolean>(false)
    const [error, setError] = useState<any>(null)
    const [noted, setNoted] = useState(true)
    type ExecuteArgs = {
        validatorAddress: string;
        ulunaAmount: string | number;
    }
    const execute = useCallback(async ({ validatorAddress, ulunaAmount }: ExecuteArgs) => {
        try {
            setLoading(true)
            setData(null)
            setError(null)
            if (!wallet)
                setError('No valid wallet.');
            const msg = new MsgUndelegate(address, validatorAddress, new Coin('uluna', ulunaAmount));

            const { result, success } = await wallet.post({
                msgs: [msg],
                memo: 'Unstake',
            });
            console.log('Tx hash: %s, with error: %s', result.txhash, JSON.stringify(success));
            setData(data)
        } catch (error: any) {
            setError(error)
        } finally {
            setLoading(false)
            setNoted(false)
        }
        // eslint-disable-next-line
    }, [address, wallet])

    return { data, loading, error, noted, setNoted, execute }
}
