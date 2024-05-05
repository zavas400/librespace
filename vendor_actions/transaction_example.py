from bsvlib import Wallet
from bsvlib.constants import Chain
import json 

w = Wallet(chain=Chain.MAIN)

## se añade la llave privada a la wallet
w.add_key('PRIVATE KEY')

## Address, n satoshis
            #server addr                          #N SATOSHIS
outputs = [('1GNkW9xS4rHswpiePoAhjbqG4wrBbHK7yj', 50)]

jasonn = {"vendor": "VENDOR", "hash": "HASH", 
          "real_name": "NAME.txt", "description": "DES"} 
##JSON to string
pushdatas = [json.dumps(jasonn)]

## we load the transaction to the BSV network
print(w.create_transaction(outputs=outputs, pushdatas=pushdatas).broadcast())