const _ = require('lodash');

let app = {
  id: "484929849",
  company_name: "Budget Core Limited",
  slug: "budget-core-app"
}

let user = {
  id: "573839293",
  name: "Dami Banwo",
  accounts: [
    {
      id: "3084202491",
      name: "Core Savings",
      act_no: 1933849303,
      connected: true,
      connected_apps: ["catch-a-ride-app"]
    },
    {
      id: "3084202492",
      name: "Current Account",
      act_no: 2844908489,
      connected: false,
      connected_apps: []
    }
  ]
}

function connectApp() {
  user.accounts.map(account => {
    if (account.connected) {
      if (!account.connected_apps.includes(app.slug)) account.connected_apps.push(app.slug)
    }
  })
}

_.times(3, connectApp);

console.log('User => ', {id: user.id, name: user.name}, '\nAccounts  =>', user.accounts)