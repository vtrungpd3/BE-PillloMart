const firebaseAdmin = require('firebase-admin');
const { v4: uuidv4 } = require('uuid');

const serviceAccount = require('../pilllowmart-firebase-adminsdk-89jar-12f889c612.json');

const admin = firebaseAdmin.initializeApp({
    credential: firebaseAdmin.credential.cert(serviceAccount),
});

const storageRef = admin.storage().bucket(`gs://pilllowmart.appspot.com`);

const uploadFile = async (path, filename) => {

    // Upload the File
    await storageRef.upload(path, {
        public: true,
        destination: filename,
        metadata: {
            firebaseStorageDownloadTokens: uuidv4(),
        }
    });

    const url = `https://firebasestorage.googleapis.com/v0/b/pilllowmart.appspot.com/o/${filename}?alt=media&token=${uuidv4()}`;
    return url;
}

module.exports = uploadFile;