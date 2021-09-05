//company ID: 484929849
//customer ID: 573839293
require('dotenv').config()
const axios = require('axios').default;

const request = axios.create({
    baseURL: process.env.OKRA_URL,
    timeout: 1000,
    headers: {'Content-Type': 'application/json'}
  });

let userInfo, refreshBalanceResponse, logoutResponse;

async function refreshBalance(username, password) {
    const response = await login(username, password);
    if (response.status == 'success') {
        userInfo = response.data
        const data = await refreshwallet(userInfo.profile.id);
        if (data.status == 'success') {
            refreshBalanceResponse = data.data.wallet
            logoutResponse = await logout()
        } else {
            return  {
                status: 'error',
                message: response.message
            }
        }
        const payload =  {
            username: userInfo.profile.name,
            userId: userInfo.profile.id,
            userInitialWalletAmount: userInfo.profile.wallet.amount,
            userRefreshWalletAmount: refreshBalanceResponse.amount,
            logoutMessage: logoutResponse
        }
        console.log(payload)
        return payload
    } else {
        return  {
            status: 'error',
            message: response.message
        }
    }
  }
  
  refreshBalance('okra_user', 'okra_pass')


async function login(username, password) {
    try {
        const response = await request.post('/login', {
            username: username,
            password: password
        })
        return response.data
    } catch (error) {
        throw(error);
    }
} 

async function refreshwallet(walletId) {
    try {
        const data = await request.post('/refresh-wallet', {
            id: walletId, 
            variable: "variable"
        })
        return data.data
    } catch (error) {
        throw(error);
    }
}

async function logout() {
    try {
        const data = await request.get('/logout')
        return data.data
    } catch (error) {
        throw(error);
    }
}