import { Appbar } from "../components/Appbar";
import BalanceComponent from "../components/Balance";
//import { Balance } from "../components/Balance";
//import { Balance } from "../components/Balance";
import {Users} from "../components/Users"
//import axios from 'axios';
export function Dashboard()
{
    return <div> 
        <Appbar/>
        <div className="m-8">
        <BalanceComponent/>
        <Users/>
        </div>
    </div>
}