module.exports = {
    app: {
        port: 8080,
        morganEnable: true, // logs
        authHeaderKey: 'authorization',
        jwt: {
            secret: 'pilllowmart',
        }
    },
    api: {
        pagination: {
            index: {
                field: 'pageIndex',
                default: 0,
                min: 0,
            },
            size: {
                field: 'pageSize',
                default: 10,
                min: 1,
                max: 11
            }
        },
        prefix: '/api'
    },
    storage: {
        rootPath: './uploads',
        limit: 1024 * 1024 * 10, // 10MB
        bodyField: 'image',
        mimeGroup: {
            image: [
                'image/jpeg', 'image/png', 'image/svg+xml', 'image/gif', 'image/bmp', 'image/jpg', 'image/svg',
            ]
        },
    },
    firebase: {
        serviceAccount: {
            type: 'service_account',
            project_id: 'pilllowmart',
            private_key_id: '12f889c612ad4243e2ead868fe6044b94837c89c',
            private_key: '-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCa6pRgMEGvnKJO\n2y4l+UCE7zDxpA/vY5tpUSOdj7uUiMVFTghIVLlbgpFM5Cj7SUfIFfqsTbchkMX9\nZH7+a6RnU+3heas7kJv7Pv68uXK+KSbN0BaxfAB9bQpN68ePPmDm0CDcGdy5qtwo\nyAhUDLh4uRn2ONtyY/Id+eyKbUlfRB1AqamcP2A6d62d+Oh3Vr0ikr+fU6oaEcDr\n/PucE8O5E8KzwrSe9qk/vC6oxIprN8WVgt7ozDUpoCbW86PV0DL+YImEEtgJVadD\nUdbeuiTDtsVmg0Xz0xIfcaV88eRv6ZFVI97Elp0WsfReQC0sil06Yo8lF4xzc4Ae\nFf2pliZXAgMBAAECggEAMoXNlR831OuK/Ze60bSb557QggYlEkgUb8EAEgtFvFfs\nqkEcL2a+Ost20rJYcTeBew47/gSsdHxwLccgKZ52dCJpos7Y2ui7DjIJxwfeFYl7\nN8UlGYYc7MrqgOYj46IO3UfEZ7PhigXgnkY6fRrW8LxBbM03OHPDCyauj6i7tJ8S\n1UhsgNkVaKcpFP3D3BFvj8QdL1P70G0RRp1k9Z55eHRjycgUEDD6IQLXKh27joq3\ngM1uJgbBIcqcL4O5nrOMPGISC9lCXKLrhOppNqid45i/0USRxoEAuIhIc6h1mjRQ\nvrCSOsBx0LI+wgwh3oOQg7D5F2M869ZlFiKwWmK/uQKBgQDLLbvgcnnaEJJQfNO+\nz4vNBsbY4ZgkQ+2JmAVT7WPjxZ0h8/JqLKgf8/g9mVbiZt0ko5A7R6AjzU9X2IW5\nvLUNAOV3WnWkkBf4D4213dM9ryJ+cchQ10sdUn9ZHZoeEHN5SG0UBA1tlIWuitQO\nzZBylxtcJknfmkBgcOB/u6w3bwKBgQDDMNDEWdkXl0wRTe5A/tjm7nKgxQNFoejD\nfe2osDV8+GG+Cb78OXw7gKh+Q09VVVkmIMxjyMhgqzI8hSikKaIG9qHIbKLer72v\nfdwFuuPLP4vxIBiUJCIoP9DvcjPSS2NZj20W+QNx0F97nnu7dBfgt6hsOamjKGQL\n6ddr0YzLmQKBgQCcjSujQHGVTYl/jP8WmhKtMpiKyiCRaOmhSEpqpZJ/EWgGnlHd\n73TH0hMnW3xvzDR/I6xhkMnabDrDhClduQKD93nXohLdbs2ZLFrTlA1NDSH17bQc\nXhcZi9RmFQIIQkLHY7/wWUMDeRocKApHMasoMDg7o6DuMouCA9dndHK47wKBgCwO\n88CuazNJAnGRfqsLG1idECC7964bCtg9r4x5IcmwoxdrScHTE/i2ZNIDTX/8gN/7\nXUdUxe4UFoXUpMTRZPJfb0s3QlgzoQRgy247rjltgaAO151wvokJRpcV1x6rx6Qq\nnLwnvyBMoZDcyB8a6Fzf99Nd/K2Ia3TI9sguh7JZAoGAUUYSMi6Og+7J1bQT1e91\nGleGU0FIGtikX3HwZMMoGMJke042Nr4zoukglIvc4Gjk543AikbmHLSSe2NtzZaf\nQEvmBOuEAMswfwUZkI9IM0cTDeGG+A/Nxn1faue6u85PUB2NLbud0xpmguitJnjk\nPva+7L6drNKR+zkCpSz23BI=\n-----END PRIVATE KEY-----\n',
            client_email: 'firebase-adminsdk-89jar@pilllowmart.iam.gserviceaccount.com',
            client_id: '117414660858270811034',
            auth_uri: 'https://accounts.google.com/o/oauth2/auth',
            token_uri: 'https://oauth2.googleapis.com/token',
            auth_provider_x509_cert_url: 'https://www.googleapis.com/oauth2/v1/certs',
            client_x509_cert_url: 'https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-89jar%40pilllowmart.iam.gserviceaccount.com'
        },
        bucket: 'gs://pilllowmart.appspot.com',
        url: (filename, id) => {
            return `https://firebasestorage.googleapis.com/v0/b/pilllowmart.appspot.com/o/${filename}?alt=media&token=${id}`;
        }
    },
    database: {
        mongo: {
            uri: 'mongodb+srv://admin:admin@pillowmart.pv3ig.mongodb.net/pillloMart?retryWrites=true&w=majority',
            options: {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        },
    }
};