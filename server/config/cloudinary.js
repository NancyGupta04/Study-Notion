const cloudinary = require("cloudinary").v2;

exports.cloudinaryConnect = () => {
	try {
		cloudinary.config({
			cloud_name: process.env.CLOUD_NAME,
			api_key: process.env.API_KEY,
			api_secret: process.env.API_SECRET,
		});
		console.log("Cloudinary is connected successfully");
	} catch (error) {
		console.log(error);
	}
};
exports.uploadImage = (file) => {
	return new Promise((resolve, reject) => {
		cloudinary.uploader.upload(file, { folder: "StudyNotion" }, (error, result) => {
			if (error) {
				reject(error);
			} else {
				resolve(result);
			}
		});
	});
};