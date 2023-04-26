# How to Create a Certificate Authority (CA) Certificate and a Self-Signed Certificate

In this tutorial, you will learn how to create a Certificate Authority (CA) Certificate, as well as a Self-Signed Certificate.

```shell
# Private key variables
export KEY_LEN=4096
# DAYS = 4 years + 1 day
export DAYS=1461
export PASSPHRASE=fcyLV061dcXyYv8BFDyNUxNA

# Certificate variables
# Country Name (2 letter code from https://www.iso.org/obp/ui/#search)
export COUNTRY=UA
# State or Province Name
export STATE=Odesa
# Locality Name (eg, city)
export LOC=Odesa
# Organization Name (eg, company)
export ORG=StarterOrg
# Organizational Unit Name (eg, section)
export ORG_UNIT=.
# Common Name (e.g. server FQDN or YOUR name)
export SERVER_CN=server-mongo-${KEY_LEN}
export EMAIL=53556648+lehcode@users.noreply.github.com

# Certificate authority variables
export CA=Starter-CA # Key file
# Certificate Authority Organisation Common Name
export CA_ORG_CN=Starter Root-CA Org
```

## Generate the CA Private Key

```shell
openssl genrsa -aes256 -passout pass:${PASSPHRASE} -out ${CA}.key ${KEY_LEN}
```

## Generate the CA Root Certificate

```shell
openssl req -x509 -new -nodes -key ${CA}.key -sha256 -days ${DAYS} -out ${CA}.crt -passin pass:${PASSPHRASE} -subj '/CN=${CA_ORG_CN}/C=${COUNTRY}/ST=${STATE}/L=${LOC}/O=${ORG}'
```

## Add the CA certificate to the trusted root certificates

Rus as `root` or under `sudo`.

### Linux (Ubuntu)

```shell
apt-get -y install ca-certificates
cp ${CA}.crt /usr/local/share/ca-certificates
update-ca-certificates
```

### Linux (Fedora/CentOS)

```shell
cp ${CA}.crt /etc/pki/ca-trust/source/anchors/${CA}.crt
update-ca-trust
```

## Generate the Server Certificate with a CSR and the OpenSSL V3 Extension File

```shell
openssl req -new -nodes -out ${SERVER_CN}.csr -newkey rsa:${KEY_LEN} -keyout ${SERVER_CN}.key -subj '/CN={CA_NAME}/C=${COUNTRY}/ST=${STATE}/L=${LOC}/O=${ORG}'
```

The `v3.ext` file contains the properties of the `v3` extension of certificates. This includes especially the *SAN (Subject Alternative Names)* which contains the information about DNS or IP, which the browser needs to trust the certificate.

`v3.ext` file contents:

```text
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = myserver
DNS.2 = myserver.local
```

## Sign the Certificate

```shell
openssl x509 -req -in ${SERVER_CN}.csr -CA ${CA}.crt -CAkey ${CA}.key -CAcreateserial -out ${SERVER_CN}.crt -days ${DAYS} -sha256 -extfile v3.ext
```

## Verify the Signed (Public) Keyfile with OpenSSL

```shell
openssl x509 -text -in ${SERVER_CN}-signed-class1.key -noout
```
