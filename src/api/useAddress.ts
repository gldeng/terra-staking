import { useWallet } from "@terra-money/wallet-provider";

export const useAddress = () => {
    const wallet = useWallet();
    return wallet.wallets[0]?.terraAddress ?? '';
}
