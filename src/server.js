const express = require("express");
const morgan = require("morgan");
const methodOverride = require("method-override");
const { engine } = require("express-handlebars");
const path = require("path");
const app = express();
const route = require("./routes/routes");
const db = require("./config/db/db");
const cors = require("cors");
const cookieSession = require("cookie-session");
const session = require('express-session');
const flash = require('connect-flash');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const User = require('./app/models/User');
const bcrypt = require("bcryptjs");
require("dotenv").config({path:`${__dirname}../.env`});
const PORT = 3000;
if (`${process.env.NODE_ENV}` !== "production") {
	require("dotenv").config();
}

// Cung cấp middleware trên Express để kích hoạt CORS
var corsOptions = {
	origin: "https://crm.drtuananh.vn",
};

// Method Override
app.use(methodOverride("_method"));

// Kiểm tra trước khi đến lớp bảo mật
app.use(cors(corsOptions));

// Lưu trữ dữ liệu trên client mà không yêu cầu csdl ở server
app.use(
	cookieSession({
		name: "Hachitech-session",
		secret: `${process.env.SECURITY_KEY}`,
		httpOnly: true,
		secure: false, // change to 'true' when switching to production enviroment
		sameSite: 'strict',
		path: '/'
	})
);

app.use(session({
	secret: `${process.env.FLASH_SESSION_KEY}`,
	saveUninitialized: true,
	resave: true
}));

app.use(flash());

// Kết nối tới cơ sở dữ liệu
db.connect();

// Cấu hình đường dẫn tệp tin tĩnh
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static(path.sep));

// Phân tích cú pháp yêu cầu của các loại nội dung
app.use(bodyParser.urlencoded({ extended: true, limit: '2gb' }));
app.use(bodyParser.json());

// Xem những yêu cầu được ghi chép lại
app.use(morgan("combined"));

// Mẫu thiết kế giao diện
app.engine(
	"hbs",
	engine({
		extname: ".hbs",
		helpers: {
			sum: (a, b) => a + b,
			cutString: (str, num) => {
				var newStr = str.toString();
				return newStr.length > num ? "..." + newStr.slice(num, newStr.length) : newStr;
			},
			cutPassword: (str, num) => {
				if (str !== undefined && str !== null && str !== '') {
					return str.length > num ? str.slice(0, num) + '...' : str;
				}
			},
			cutStr: (str, num) => {
				if (str !== undefined && str !== null && str !== '') {
					console.log(str)
				}
			},
			formatDate: (d) => {
				let date = new Date(d);
				let newDate = date.toLocaleString('vi-VI', { weekday: "long", day: 'numeric', month: 'numeric', year: 'numeric', hour: 'numeric', minute: 'numeric', second: 'numeric' });
				return newDate;
			},
			formatBirth: (d) => {
				let date = new Date(d);
				let newDate = date.toLocaleString('vi-VI', { day: 'numeric', month: 'numeric', year: 'numeric' });
				return newDate;
			},
			count: (arr) => {
				let count = 0;
				if (arr === undefined) {
					return 0;
				} else {
					for (const index of arr) {
						count += 1;
					}
					return count;
				}
			},
			filter: (array) => {
				let arr = [];
				array.forEach(item => {
					arr.push(item.name);
				})
				return arr;
			},
			getUrl: (params) => {
				return params.url
			},
			view: (value) => {
				console.log('view', value)
			},
			getDoctor: (arr) => {
				let newArr = [];
				arr.forEach(item => {
					console.log(newArr);
					newArr.push({ id: item._id, fullName: `${item.firstName} ${item.lastName}`})
				})
				return newArr;
			},
			formatMoney: (money) => {
				let convertMoney = parseFloat(money);
				var formatter = new Intl.NumberFormat('vi-VN', {
					style: 'currency',
					currency: 'VND',
					
				});
				let convertedMoney = formatter.format(convertMoney);
				return convertedMoney;
			},
			getGender: (value) => {
				if (value === 'Nữ' || value === 'Nam') {
					return value;
				} else {
					return value = '-- Chọn giới tính --';
				}
			},
			show: (value) => {
				return value;
			}
		}
	})
);

// Cấu hình đuôi tệp tin
app.set("view engine", "hbs");
// Cấu hình đường dẫn đến tệp tin chứa giao diện người dùng
app.set("views", path.join(__dirname, "resources", "views"));

app.use(function (req, res, next) {
	res.locals.messages_account_failure = req.flash('messages_account_failure');
	res.locals.messages_password_failure = req.flash('messages_password_failure');
	res.locals.messages_server_failure = req.flash('messages_server_failure');
	res.locals.messages_token_failure = req.flash('messages_token_failure');
	res.locals.messages_token_wrong = req.flash('messages_token_wrong');
	res.locals.messages_createReExamination_success = req.flash('messages_createReExamination_success');
	res.locals.messages_editReExamination_success = req.flash('messages_editReExamination_success');
	res.locals.messages_pushReExamination_error = req.flash('messages_pushReExamination_error');
	res.locals.messages_createSchedule_success = req.flash('messages_createSchedule_success');
	res.locals.messages_editSchedule_success = req.flash('messages_editSchedule_success');
	res.locals.messages_deleteSchedule_success = req.flash('messages_deleteSchedule_success');
	res.locals.messages_restoreSchedule_success = req.flash('messages_restoreSchedule_success');
	res.locals.messages_createCustomer_success = req.flash('messages_createCustomer_success');
	res.locals.messages_editCustomer_success = req.flash('messages_editCustomer_success');
	res.locals.messages_updateCusInfo_success = req.flash('messages_updateCusInfo_success');
	res.locals.messages_updateService_success = req.flash('messages_updateService_success');
	res.locals.messages_deleteService_success = req.flash('messages_deleteService_success');
	res.locals.messages_updateCusDischarge_success = req.flash('messages_updateCusDischarge_success');
	res.locals.messages_updateServiceNoteDone_success = req.flash('messages_updateServiceNoteDone_success');
	res.locals.messages_uploadCounselor_success = req.flash('messages_uploadCounselor_success');
	res.locals.messages_uploadBefore_success = req.flash('messages_uploadBefore_success');
	res.locals.messages_uploadInsurgery_success = req.flash('messages_uploadInsurgery_success');
	res.locals.messages_uploadAfter_success = req.flash('messages_uploadAfter_success');
	res.locals.messages_uploadReexam_success = req.flash('messages_uploadReexam_success');
	res.locals.messages_moveCustomer_success = req.flash('messages_moveCustomer_success');
	next();
});

app.use(function (req, res, next) {
	res.header(
		"Access-Control-Allow-Headers",
		"x-access-token, Origin, Content-Type, Accept"
	);
	next();
});


// Initial account root and admin
function initRoot() {
	User.findOne({ roleEng: 'root' })
		.then(user => {
			const userRoot = new User({
				account: 'root',
				password: bcrypt.hashSync(`${process.env.PASSWORD_ROOT}`, 8),
				role: 'Gốc',
				roleEng: 'root'
			})
			if (user) {
				console.log(`User ${user.account} is existed`)
				return;
			} else {
				userRoot.save();
				console.log('Created user root successfully!!!')
			}
		})
}

function initAdmin() {
	User.findOne({ roleEng: 'administrator' })
		.then(user => {
			const userAdmin = new User({
				account: 'admin',
				password: bcrypt.hashSync(`${process.env.PASSWORD_ADMIN}`, 8),
				role: 'Quản trị viên',
				roleEng: 'administrator'
			})
			if (user) {
				console.log(`User ${user.account} is existed`)
				return;
			} else {
				userAdmin.save();
				console.log('Created user admin successfully!!!')
			}
		})
}

initRoot();
initAdmin();

// Khởi tạo các tuyến đường
route(app);

app.listen(`${process.env.PORT}`, () => {
	console.log(`Ứng dụng đang chạy trên port ${process.env.PORT}`);
});
