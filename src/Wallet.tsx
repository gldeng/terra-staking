import { BridgePurePaper } from './Paper';
import { Route, Routes } from "react-router-dom";
import Staking from './Staking';
import Unstaking from './Unstaking';
import { TransactionTypeTabs } from './TransactionTypeTabs';


export default () => {
    return (<BridgePurePaper>
    <TransactionTypeTabs/>
        <Routes>
            <Route path='stake' element={<Staking />}/>
            <Route path='unstake' element={<Unstaking />} />
        </Routes>
    </BridgePurePaper>)
};
