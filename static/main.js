class Profile {
    constructor({ username, name: { firstName, lastName }, password }) {
        this.username = username;
        this.name = { firstName, lastName };
        this.password = password;
    }
}

addUser(callback); {
    console.log(`Adding user ${this.username}`);
    return ApiConnector.create.user({
            username: this.username,
            name: this.name,
            password: this.password
        },
        (err, data) => callback(err, data)
    );
}

authorization(callback); {
    console.log(`Authorizating user ${this.username}`);
    return ApiConnector.performLogin({
            username: this.username,
            password: this.password
        },
        (err, data) => callback(err, data)
    );
}

addMoney({ currency, amount }, callback); {
    console.log(`Adding ${amount} of ${currency} to ${this.username}`);
    return ApiConnector.addMoney({ currency: cuurency, amount: amount },
        (err, data) => callback(err, data)
    );
}

convertMoney({ fromCurrency, targetCurrency, targetAmount }, callback); {
    console.log(`Converting ${fromCurrency} to ${targetAmount} of ${targetCurrency}`);
    return ApiConnector.convertMoney({ fromCurrency: fromCurrency, targetCurrency: targetCurrency, targetAmount: targetAmount },
        (err, data) => callback(err, data)
    );
}

transferMoney({ to, amount }, callback); {
    console.log(`Tranfering ${amount} NETCOINS from ${this.username} to ${to}`);
    return ApiConnector.transferMoney({ to: to, amount: amount },
        (err, data) => callback(err, data)
    );
}

function getStocks(callback) {
    return ApiConnector.getStocks((err, data) => {
        console.log(`Getting stocks info`);
        callback(err, data);
    });
}

function main() {
    const Vasiliy = new Profile({
        username: 'Vasiliy',
        name: { firstName: 'Vasiliy', lastName: 'Smirnov' },
        password: 'qwerty123456',
    });
    const Julia = new Profile({
        username: 'Julia',
        name: { firstName: 'Julia', lastName: 'Smirnova' },
        password: 'julia123',
    });

    getStocks((err, data) => {
        if (err) {
            console.error('Error occured')
        } else {
            let currencyConvert = data;
            console.log(currencyConvert);

            Vasiliy.createUser((err, data) => {
                if (err) {
                    console.error('Error during user creating')
                } else {
                    console.log(`${Vasiliy.username} account created`);
                }

                Julia.createUser((err, data) => {
                    if (err) {
                        console.error(`Error during user creating`)
                    } else {
                        console.log(`${Julia.username} account created`);
                    }

                    Vasiliy.performLogin((err, data) => {
                        if (err) {
                            console.error(`Authorization error`)
                        } else {
                            console.log(`${Vasiliy.username} authorized`);
                        }

                        Vasiliy.addMoney({ currency: 'RUB', amount: 1000 }, (err, data) => {
                            if (err) {
                                console.error(`Error during money receiveing to ${Vasiliy.name}`);
                            } else {
                                const converted = currencyConvert[99].RUB_NETCOIN * data.wallet.RUB;
                                console.log(`1000 RUB received by ${Vasiliy.username}`);
                            }

                            Vasiliy.convertMoney({ fromCurrency: 'RUB', targetCurrency: 'NETCOIN', targetAmount: converted }, (err, data) => {
                                if (err) {
                                    console.error(`Convertion error`);
                                } else {
                                    console.log(`Converted to coins`, data);
                                    const transfer = data.wallet.NETCOIN;
                                    Vasiliy.transferMoney({ to: Julia.username, amount: transfer }, (err, data) => {
                                        if (err) {
                                            console.error(`Transfer error`)
                                        } else {
                                            console.log(`${Julia.username} has got ${tranfer} NETCOINS`);
                                        }
                                    });
                                };
                            });

                        });
                    });

                });
            });
        };
    });
}