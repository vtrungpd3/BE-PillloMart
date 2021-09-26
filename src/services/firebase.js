const firebaseAdmin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');
const { serviceAccount, bucket, url } = require('../config').firebase;

const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

const storageRef = admin.storage().bucket(bucket);

const uploadImage = async (path, filename) => {

    const data = await storageRef.upload(path, {
        public: true,
        destination: filename,
        metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
        }
    });

    if (!data[0]?.metadata?.mediaLink) {
        return null;
    }

    return url(filename, uuidv4());
};

module.exports = uploadImage;