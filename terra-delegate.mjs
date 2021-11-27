import { LCDClient, MsgDelegate, MnemonicKey, Coin } from '@terra-money/terra.js';

async function delegate(key, validator, amount) {
    // Mainnet
    // const terra = new LCDClient({
    //     URL: 'https://lcd.terra.dev',
    //     chainID: 'columbus-5',
    // });

    // Testnet
    const terra = new LCDClient({
        URL: 'https://bombay-lcd.terra.dev',
        chainID: 'bombay-12',
    });

    // To use LocalTerra
    // const terra = new LCDClient({
    //   URL: 'http://localhost:1317',
    //   chainID: 'localterra'
    // });
    const wallet = terra.wallet(key);
    
    const msg = new MsgDelegate(key.accAddress, validator, amount);
    try{

        const tx = await wallet.createAndSignTx({
            msgs: [msg],
            memo: 'test from terra.js!',
        });
        const result = await terra.tx.broadcast(tx);
        console.log(`TX hash: ${result.txhash}`);
    }catch(err){
        console.log('failed', err.msg)
    }
}

async function main() {
    const ROCKX_VALIDATOR = 'terravaloper1aw0znxtlq0wrayyz7wppz3qnw94hfrmnnrcxja';
    const mnemonic = 'test test test test test test test test test test test test';
    const mk = new MnemonicKey({
        mnemonic: mnemonic,
    });
    delegate(mk, ROCKX_VALIDATOR, new Coin('uluna', 1))
}

main();