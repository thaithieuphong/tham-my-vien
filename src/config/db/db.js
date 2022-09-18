const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
      	console.log('Kết nối cơ sở dữ liệu thành công');
    }
    catch(error) {
      console.log('Kết nối cơ sở dữ liệu thất bại');
    }
}

module.exports = { connect };