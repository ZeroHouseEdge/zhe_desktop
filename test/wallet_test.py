import json
from os.path import expanduser
from two1.wallet import Two1Wallet
from two1.bitcoin.crypto import HDKey
from two1.bitcoin.utils import bytes_to_str, hex_str_to_bytes
from two1.wallet.base_wallet import convert_to_satoshis

with open('{}/.two1/wallet/default_wallet.json'.format(expanduser('~'))) as data_file:
    wallet_data = json.load(data_file)

wallet = Two1Wallet.import_from_mnemonic(mnemonic=wallet_data['master_seed'])

pubkey_bytes = wallet.get_payout_public_key().__bytes__()
pubkey_str = bytes_to_str(pubkey_bytes)

print(pubkey_str)

pubkey_obj = HDKey.from_hex(pubkey_str)
print(pubkey_obj)

x = convert_to_satoshis(0.0024529)
print(x)
