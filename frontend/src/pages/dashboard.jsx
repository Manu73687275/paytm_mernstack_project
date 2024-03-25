import { Appbar } from "../components/Appbar";
import { Balance } from "../components/Balance";
import {Users} from "../components/Users"
import axios from 'axios';
export function Dashboard()
{
    
    async function balance() {
        try {
            let b = await axios.get("http://localhost:3000/api/v1/account/balance");
            console.log(b.data); // Assuming 'b' contains the response object and you want to log the data
        } catch (error) {
            console.error("Error fetching balance:", error);
        }
    }
    
    
    balance(); // Call the function to execute it
    
    
    return <div> 
        <Appbar/>
        <div className="m-8">
        
        <Balance value={balance}/>
        <Users/>
        </div>
    </div>
}