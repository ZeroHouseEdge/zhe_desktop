#!/usr/bin/python3
import sys
import json
from os.path import expanduser
from two1.wallet import Two1Wallet

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
   execute(arg)


