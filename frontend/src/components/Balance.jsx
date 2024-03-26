
import  { useState } from 'react';
import axios from 'axios';

function BalanceComponent() {
    const [balance, setBalance] = useState(null);

    const checkBalance = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/v1/account/balance", {
                headers: {
                    Authorization: "Bearer " + localStorage.getItem("token")
                }
            });
            setBalance(response.data.msg);
        } catch (error) {
            console.error('Error:', error);
           
        }
    };

    return (
        <div>
            <button onClick={checkBalance} className=' border-2 border-black rounded-lg bg-slate-500 text-white px-2'>Check Balance Here</button>
            {balance !== null && (
                <p>Balance: {balance}</p>
            )}
        </div>
    );
}

export default BalanceComponent;
