//company ID: 484929849
//customer ID: 573839293
require('dotenv').config()
const axios = require('axios').default;

const request = axios.create({
    baseURL: process.env.OKRA_URL,
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
  });

async function refundCustomer(company, user, amount) {
    const initialWalletBalance = await fetchWalletBalance(user);
    response = await refund(company, user, amount)
    if (response.status == 'success') {
        const finalWalletBalance = await fetchWalletBalance(user);
        const payload =  {
            status: 'success',
            initialBalance: initialWalletBalance,
            currentBalance: finalWalletBalance
        }
        console.log(payload)
        return payload
    } else {
        const error =  {
            status: 'error',
            message: response.message
        }
        console.log(error)
        return error
    }
  }
  
refundCustomer('484929849', '573839293', 2003.0)


async function fetchWalletBalance(userId) {
    try {
        const response = await request.post('/fetch-wallet', {
            id: userId
        })
        return response.data.data.wallet.amount
    } catch (error) {
        throw(error);
    }
} 

async function refund(fromId, toId, amount) {
    try {
        const data = await request.post('/pay', {
            from_id: fromId, 
            to_id: toId, 
            amount: amount
        })
        return data.data
    } catch (error) {
        throw(error);
    }
}