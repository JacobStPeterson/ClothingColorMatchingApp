import {writeFile} from "node:fs";

import {sha512} from "js-sha512";

const accounts = {};

var hashed_password = sha512('pass');
accounts['user'] = hashed_password;

const jsonString = JSON.stringify(accounts);

writeFile('accounts.json', jsonString, (err) => {
    if (err) throw err;
});

//console.log('Hashtable saved to accounts.json');

//const loadedJsonString = fs.readFileSync('accounts.json', 'utf8');
//const loadedHashtable = JSON.parse(loadedJsonString);

//console.log('Hashtable loaded from accounts.json:', loadedHashtable);

