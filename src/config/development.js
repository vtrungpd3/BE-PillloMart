module.exports = {
    app: {
        port: 7799,
        morganEnable: true, // log
        corsMode: "all", // cors
        authHeaderKey: "authorization",
        jwt: {
            secret: "vcteam2021",
        }
    },
    api: {
        pagination: {
            index: {
                field: "pageIndex",
                default: 0,
                min: 0,
            },
            size: {
                field: "pageSize",
                default: 10,
                min: 1,
                max: 50
            }
        },
        preflix: "/api"
    },
    storage: {
        rootPath: "/upload",
        isRelativePath: true,
        limit: 15, // MB
        groupPath: {
            image: "/image",
            common: "/common",
            temp: "/temp"
        },
        bodyField: "file",
        multiSupport: false,
        mimeGroup: {
            image: [
                "image/jpeg", "image/png", "image/svg+xml", "image/gif", "image/bmp",
            ],
            common: [
                "text/plain",
            ]
        },
        cacheOptions: {
            enable: true,
            options: {
                "max-age": 3600
            }
        }
    },
    database: {
        mongo: {
            uri: "mongodb://vcteam:vcteam2020@178.128.49.136:27017/?authSource=admin",
            options: {
                useNewUrlParser: true, useUnifiedTopology: true,
            }
        },
    }
}