// var BIP39 = require('bip39');
// var rng = require('secure-random').randomBuffer;
// var Wallet = require('zhe-wallet');
// var crypto = require('crypto');
// var bitcoin = require('bitcoinjs-lib');
import BIP39 from 'bip39';
import Wallet from 'zhe-wallet';
import crypto from 'crypto';
import bitcoin from 'bitcoinjs-lib';
const rng = require('secure-random').randomBuffer;

var wallet = null;

function getPubkey(hd) {
   return hd.keyPair.Q.getEncoded().toString('hex');
}

function getWallet(){
  return wallet
}

function createWallet(mnemonic, network) {
  return new Promise((resolve, reject) => {
    const valid = BIP39.validateMnemonic(mnemonic);

    if(!valid) {
      reject("Invalid Mnemonic");
    }

    createSeed(mnemonic).then((seed) => {
      resolve({ seed: seed });
    });
  });
}

function createSeed(mnemonic) {
  return new Promise((resolve, reject) => {
    const seed = BIP39.mnemonicToSeedHex(mnemonic);
    if(!seed) {
      reject('Couldn\'t create seed');
    }

    resolve(seed);
  });
}

function initWallet(externalAccount, internalAccount, networkName, done, unspentsDone, balanceDone){
  wallet = new Wallet(externalAccount, internalAccount, networkName, function(err, w) {
    if(err) return done(err)

    var txObjs = wallet.getTransactionHistory()
    done(null, txObjs.map(function(tx) {
      var parsedTx = parseTx(wallet, tx);
      return parsedTx;
    }))
  }, unspentsDone, balanceDone)

  wallet.denomination = 'BTC'
}


function parseTx(wallet, tx) {
  var id = tx.getId()
  var metadata = wallet.txMetadata[id]
  var network = bitcoin.networks[wallet.networkName]

  var timestamp = metadata.timestamp
  timestamp = timestamp ? timestamp * 1000 : new Date().getTime()

  var node = wallet.txGraph.findNodeById(id)
  var prevOutputs = node.prevNodes.reduce(function(inputs, n) {
    inputs[n.id] = n.tx.outs
    return inputs
  }, {})

  var inputs = tx.ins.map(function(input) {
    var buffer = new Buffer(input.hash)
    Array.prototype.reverse.call(buffer)
    var inputTxId = buffer.toString('hex')

    return prevOutputs[inputTxId][input.index]
  })

  return {
    id: id,
    amount: metadata.value,
    timestamp: timestamp,
    confirmations: metadata.confirmations,
    fee: metadata.fee,
    ins: parseOutputs(inputs, network),
    outs: parseOutputs(tx.outs, network)
  }

  function parseOutputs(outputs, network) {
    return outputs.map(function(output){
      var obj = {
        address: bitcoin.address.fromOutputScript(output.script, network).toString(),
        amount: output.value
      };
      return obj;
    })
  }
}

module.exports = {
   getPubkey: getPubkey,
   getWallet: getWallet,
   createWallet: createWallet,
   createSeed: createSeed,
   initWallet: initWallet
};
