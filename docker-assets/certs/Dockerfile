FROM alpine/openssl

LABEL maintainer="lehcode <3556648+lehcode@users.noreply.github.com>"
LABEL description="OpenSSL service"

# https://www.mongodb.com/docs/manual/appendix/security/appendixA-openssl-ca/

ARG key_pass
ARG key_len
ARG days
ARG ca_cn
ARG server_cn
ARG subj
ARG debug

COPY openssl-server.cnf.dist /etc/ssl/mongodb/openssl-server.cnf
COPY openssl-client.cnf.dist /etc/ssl/mongodb/openssl-client.cnf

# RUN addgroup --system --gid 999 mongodb \
#     && adduser --system --uid 999 --gid 999 mongodb

RUN chown -R 999:999 /etc/ssl/mongodb

WORKDIR /etc/ssl/mongodb/
USER 999:999

# Generate certificates
RUN mkdir server && cd server \
    # Create the CA key file
    && openssl genrsa -out ca.key -passout pass:${key_pass} ${key_len} \
    # Create the CA certificate using the generated key file
    && openssl req -new -x509 -days ${days} -key ca.key -passin pass:${key_pass} \
        -out ca.crt -subj "${subj}/CN=${ca_cn}" \
    # Create the private key for the intermediate certificate
    && openssl genrsa -out  ${server_cn}.key -passout pass:${key_pass} ${key_len} \
    # Create the certificate signing request for the intermediate certificate
    && openssl req -new -key  ${server_cn}.key -passin pass:${key_pass} \
        -out  ${server_cn}.csr -subj "${subj}/CN=${ca_cn}" \
    # Create the intermediate certificate
    && sed -i 's/__CN__/${ca_cn}/g' ../openssl-server.cnf \
    && openssl x509 -sha256 -req -days ${days} -in  ${server_cn}.csr \
        -CA ca.crt -CAkey ca.key -passin pass:${key_pass} -set_serial 01 \
        -out  ${server_cn}.crt \
        -extfile ../openssl-server.cnf -extensions v3_ca \
    # Create the CA PEM file from the CA certificate and intermediate certificate
    && cat ${server_cn}.key  ${server_cn}.crt > ${server_cn}.pem

ENTRYPOINT ["/bin/sh","-c","sleep infinity"]
