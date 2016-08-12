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
      btc_amount = float(arg.split(':')[2].strip())
      sat_amount = convert_to_satoshis(btc_amount)
      txs = wallet.send_to(address, sat_amount)
      tx = txs[0]
      obj = {}
      obj['txid'] = tx['txid']
      obj['hex'] = tx['txn'].to_hex()

      print(json.dumps({ 'tx': obj }))
   elif '>' in arg:
      commands = arg.split('>')
      result = None
      for command in commands:
         toCallOn = result or wallet
         methodToCall = getattr(toCallOn, command)
         result = methodToCall()

      if isinstance(result, bytes):
         print(json.dumps({ 'data': bytes_to_str(result) }))
      else:
         print(json.dumps({ 'data': result }))
   else:
      execute(arg)


