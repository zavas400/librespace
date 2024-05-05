from bsvlib import Key


private_key = Key()

# Get the corresponding BSV address
bsv_address = private_key.address()

print("Private Key:", private_key.wif())
print("BSV Address:", bsv_address)


print(private_key )



