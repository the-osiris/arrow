const S3 = require("aws-sdk/clients/s3");
const s3 = new S3({
    region: process.env.AWS__REGION,
    accessKeyId: process.env.AWS__ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS__SECRET_KEY,
});

module.exports = async (buffer, filePath) => {
    try {
        const uploadParams = {
            Bucket: "my-bucket-zero",
            Body: buffer,
            Key: filePath,
            ContentType: "image/png",
            ContentEncoding: "base64",
        };
        const meta = await s3.upload(uploadParams).promise();
        return meta.Location;
    } catch (e) {
        console.log("Error here");
    }
};
