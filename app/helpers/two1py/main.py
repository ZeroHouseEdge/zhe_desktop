#!/usr/bin/python3
import sys
import json
from os.path import expanduser
from two1.wallet import Two1Wallet
from two1.commands.util.currency import Price
from two1.bitcoin.utils import bytes_to_str
from two1.wallet.base_wallet import convert_to_satoshis

with open('{}/.two1/wallet/default_wallet.json'.format(expanduser('~'))) as data_file:
    wallet_data = json.load(data_file)

wallet = None
wallet = wallet or Two1Wallet.import_from_mnemonic(mnemonic=wallet_data['master_seed'])

def execute(wallet_method):
   methodToCall = getattr(wallet, wallet_method)
   result = json.dumps({ wallet_method: methodToCall() })
   print(result)

# Loop through methods
del sys.argv[0]
for arg in sys.argv:
   if arg == 'USD':
      rate = Price(wallet.balance())._get_usd_rate()
      print(rate)
   elif ':' in arg:
      address = arg.split(':')[1].strip()
      amount = convert_to_satoshis(arg.split(':')[2].strip())
      txs = wallet.send_to(address, amount)
      res = []
      for tx in txs:
         res.append(tx['txid'])

      print(json.dumps({ 'tx_ids': res }))
   elif '>' in arg:
      commands = arg.split('>')
      result = None
      for command in commands:
         toCallOn = result or wallet
         methodToCall = getattr(toCallOn, command)
         result = methodToCall()

      print(json.dumps({ 'data': bytes_to_str(result) }))
   else:
      execute(arg)


