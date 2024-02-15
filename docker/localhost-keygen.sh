#!/usr/bin/env bash

openssl ecparam -genkey -name secp384r1 -out ca.secp384r1.key
openssl req -x509 -new -SHA384 -nodes -key ca.secp384r1.key -days 3650 -out ca.secp384r1.crt

openssl ecparam -genkey -name secp384r1 -out localhost.secp384r1.key
openssl req -new -SHA384 -key localhost.secp384r1.key -nodes -out localhost.secp384r1.csr

cat << EOF > ./openssl.cnf
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = localhost
EOF

openssl x509 -req -SHA384 -extfile openssl.cnf -days 365 -in localhost.secp384r1.csr -CA ca.secp384r1.crt -CAkey ca.secp384r1.key -CAcreateserial -out localhost.secp384r1.crt

