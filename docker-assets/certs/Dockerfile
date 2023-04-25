FROM alpine/openssl

LABEL maintainer="lehcode <3556648+lehcode@users.noreply.github.com>"
LABEL description="OpenSSL service"

ARG key_pass
ARG key_len
ARG days
ARG ca_cn
ARG server_cn
ARG subj
ARG debug

WORKDIR /.certs

RUN mkdir -p ./ca && mkdir -p ./client && mkdir -p ./server \
    && cd ./ca \
    # Generate CA
    && openssl genrsa -out ca.key -passout pass:${key_pass} ${key_len} \
    && openssl req -new -x509 -days ${days}  -key ca.key -passin pass:${key_pass} -out ca.crt -subj "${subj}/CN=${ca_cn}" \
    && cd ../client \
    # Generate client cert
    && openssl genrsa -out client.key -passout pass:${key_pass} ${key_len} \
    && openssl req -new -key client.key -passin pass:${key_pass} -out client.csr -subj "${subj}/CN=${server_cn}" \
    && openssl x509 -req -days ${days} -in client.csr -CA ../ca/ca.crt -CAkey ../ca/ca.key -passin pass:${key_pass} -set_serial 01 -out client.crt \
    && cd ../server \
    # Generate server cert
    && openssl genrsa -out ${server_cn}.key -passout pass:${key_pass} ${key_len} \
    && openssl req -new -key ${server_cn}.key -passin pass:${key_pass} -out ${server_cn}.csr -subj "${subj}/CN=${server_cn}" \
    && openssl x509 -req -days ${days} -in ${server_cn}.csr -CA ../ca/ca.crt -CAkey ../ca/ca.key -passin pass:${key_pass} -set_serial 01 -out ${server_cn}.crt

ENTRYPOINT ["/bin/sh","-c","sleep infinity"]
