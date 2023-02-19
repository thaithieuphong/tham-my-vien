const mongoose = require('mongoose');

async function connect() {
	try {
		mongoose.set("strictQuery", false);
		// await mongoose.connect(`${process.env.LOCAL_MONGODB}`);
		await mongoose.connect(`${process.env.MONGODB_URL}`);
		console.log('Kết nối cơ sở dữ liệu thành công');
	}
	catch (error) {
		console.log('Kết nối cơ sở dữ liệu thất bại');
	}
}

module.exports = { connect };