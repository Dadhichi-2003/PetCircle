const cloundinary = require("cloudinary").v2;
const dotenv = require("dotenv")

dotenv.config({});

const uploadFileToCloudinary = async (file) => {

    //conif
        cloundinary.config({
        cloud_name:process.env.CLOUD_NAME,
        api_key:process.env.API_KEY,
        api_secret:process.env.API_SECRET
    })

    const cloundinaryResponse = await cloundinary.uploader.upload(file.path);
    return cloundinaryResponse;



};
module.exports = {
    uploadFileToCloudinary
}