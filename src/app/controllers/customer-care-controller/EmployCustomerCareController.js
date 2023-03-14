const Customer = require("../../models/Customer");
const User = require("../../models/User");
const { mongooseToObject, multipleMongooseToObject } = require("../../../util/mongoose");
const ServiceNote = require('../../models/ServiceNote');
const Reexamination = require('../../models/Reexamination');
const fs = require('fs');
const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffmpeg = require('fluent-ffmpeg');
ffmpeg.setFfmpegPath(ffmpegPath);
const path = require('path');
const sharp = require('sharp');
const fileType = import('file-type');
const ReExaminationSchedule = require("../../models/ReExaminationSchedule");
const WoundCleaning = require("../../models/WoundCleaning");
const WoundCleaningSchedule = require("../../models/WoundCleaningSchedule");
const Log = require('../../models/Log');
const { populate } = require("../../models/Customer");
const rootPath = path.sep;
const appRoot = require('app-root-path');
const axios = require('axios');
const { pipeline } = require('stream');
const ProgressBar = require('progressbar.js');
const sizeOf = require('image-size');
require('dotenv').config();


class EmployCustomerCareController {
	//BUSINESS EMPLOY

	showProfile(req, res, next) {
		User.findById({ _id: req.userId })
			.then(user => {
				res.render('profile', {
					user: mongooseToObject(user),
					title: 'Thông tin cá nhân'
				})
			})
			.catch(next);
	}

	showDashboard(req, res, next) {
		res.redirect('/customer-care/employ/customers-wound-cleaning')
	}

	/** Customer Wound Cleaning */
	showCustomerWoundCleaning(req, res, next) {
		Promise.all([
			ServiceNote.find({ $and: [{ isPostSurgeryCare: true }, { hasWoundCleaningSchedule: false }] }).populate({
				path: 'scheduleID',
				populate: {
					path: 'cusID',
					model: 'Customer'
				}
			})
				.populate({
					path: 'woundCleaningID',
					model: 'WoundCleaning'
				}).sort({ updatedAt: 1 }),
			User.findById({ _id: req.userId })
		])
			.then(([serviceNotes, user]) => {
				console.log(serviceNotes);
				res.render('customer-care/employ/employ-customer', {
					serviceNotes: multipleMongooseToObject(serviceNotes),
					title: 'Khách thay băng cắt chỉ',
					user: mongooseToObject(user)
				})
			})
			.catch(next);
	}

	// Show customer detail
	showCustomerDetail(req, res, next) {
		Promise.all([
			ServiceNote.findById({ _id: req.params.id }).populate({
				path: 'scheduleID',
				populate: {
					path: 'cusID',
					model: 'Customer',
					populate: {
						path: 'reexamID',
						model: 'Reexamination'
					}
				}
			})
				.populate('performer'),
			User.findById({ _id: req.userId })
		])
			.then(([serviceNote, user]) => {
				res.render("customer-care/employ/employ-service-note-detail", {
					serviceNote: mongooseToObject(serviceNote),
					title: 'Thông tin chi tiết của khách hàng',
					user: mongooseToObject(user)
				})
			})
			.catch(next);
	}

	// Tạo lịch thay băng
	createWoundCleaningSchedule(req, res, next) {
		const woundCleaningSchedule = new WoundCleaningSchedule({
			userID: req.userId,
			cusID: req.body.cusID,
			serviceNoteID: req.params.id,
			status: 'Tạo mới',
			schedule: req.body.schedule,
			times: req.body.times,
			hasWoundCleaning: false
		})
		woundCleaningSchedule.save();
		const logs = new Log({
			userID: req.userId,
			customerID: req.body.cusID,
			serviceNoteID: req.params.id,
			woundCleaningScheduleID: woundCleaningSchedule._id,
			status: 'Tạo lịch hẹn thay băng',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { woundCleaningScheduleID: woundCleaningSchedule.id, logIDs: logs._id }, hasWoundCleaningSchedule: true }),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { woundCleaningScheduleID: woundCleaningSchedule.id }, $set: { hasWoundCleaningSchedule: true } })
		])
			.then(() => {
				req.flash('messages_createReExamination_success', 'Tạo lịch thay băng thành công');
				res.redirect("back");
			})
			.catch(next);
	}

	// Hiển thị trang danh sách lịch hẹn thay băng
	showWoundCleaningSchedule(req, res, next) {
		Promise.all([
			WoundCleaningSchedule.find({ hasWoundCleaning: false })
				.populate({
					path: 'cusID',
					model: 'Customer'
				})
				.populate({
					path: 'serviceNoteID',
					model: 'ServiceNote'
				}).sort({ schedule: 1 }),
			User.findById({ _id: req.userId })
		])
			.then(([woundCleaningSchedule, user]) => {
				console.log(woundCleaningSchedule);
				res.render('customer-care/employ/employ-wound-cleaning-schedule', {
					title: 'Danh sách lịch hẹn thay băng cắt chỉ',
					user: mongooseToObject(user),
					woundCleaningSchedule: multipleMongooseToObject(woundCleaningSchedule)
				})
			})
			.catch(next);

	}

	// Hiển thị trang thùng rác lịch hẹn thay băng
	showWoundCleaningScheduleTrash(req, res, next) {
		Promise.all([
			WoundCleaningSchedule.findDeleted({}).populate({
				path: 'serviceNoteID',
				model: 'ServiceNote'
			})
				.populate({
					path: 'cusID',
					model: 'Customer'
				}),
			User.findById({ _id: req.userId }),
		])
			.then(([woundCleaningSchedule, user]) => {
				console.log(woundCleaningSchedule);
				res.render('customer-care/employ/employ-wound-cleaning-schedule-trash', {
					title: 'Lịch thay băng đã hủy',
					woundCleaningSchedule: multipleMongooseToObject(woundCleaningSchedule),
					user: mongooseToObject(user)
				})
			})
			.catch(next);
	}

	// Sửa lịch hẹn thay băng
	editWoundCleaningSchedule(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			userID: req.userId,
			woundCleaningScheduleID: req.params.id,
			status: 'Sửa lịch hẹn thay băng',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id } }),
			WoundCleaningSchedule.findByIdAndUpdate({ _id: req.params.id }, { schedule: req.body.schedule, $push: { reasons: req.body.reason } })
		])
			.then(() => {
				req.flash('messages_editWoundCleaningSchedule_success', 'Sửa lịch hẹn thay băng thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Xóa lịch hẹn thay băng
	deleteWoundCleaningSchedule(req, res, next) {
		console.log(req.body)
		console.log(req.params)
		const logs = new Log({
			customerID: req.body.cusID,
			woundCleaningScheduleID: req.params.id,
			serviceNoteID: req.body.serviceNoteID,
			userID: req.userId,
			status: 'Xóa lịch hẹn thay băng',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, {
				hasWoundCleaningSchedule: false,
				statusCus: { statusVi: 'Xóa lịch hẹn thay băng', statusEng: 'deletedWoundCleaningSchedule' },
				$push: { logIDs: logs._id }
			}),
			ServiceNote.findByIdAndUpdate({ _id: req.body.serviceNoteID }, { hasWoundCleaningSchedule: false }),
			WoundCleaningSchedule.delete({ _id: req.params.id })
		])
			.then(() => {
				req.flash('messages_deleteWoundCleaningSchedule_success', 'Xóa lịch hẹn thay băng thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Khôi phục lịch hẹn thay băng
	restoreWoundCleaningSchedule(req, res, next) {
		console.log(req.body)
		console.log(req.params)
		const logs = new Log({
			customerID: req.body.cusID,
			woundCleaningScheduleID: req.params.id,
			serviceNoteID: req.body.serviceNoteID,
			userID: req.userId,
			status: 'Khôi phục lịch hẹn thay băng',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, {
				hasWoundCleaningSchedule: true,
				statusCus: { statusVi: 'Khôi phục lịch hẹn thay băng', statusEng: 'restoredWoundCleaningSchedule' },
				$push: { logIDs: logs._id }
			}),
			ServiceNote.findByIdAndUpdate({ _id: req.body.serviceNoteID }, { hasWoundCleaningSchedule: true }),
			WoundCleaningSchedule.restore({ _id: req.params.id })
		])
			.then(() => {
				req.flash('messages_restoreWoundCleaningSchedule_success', 'Khôi phục lịch hẹn thay băng thành công');
				res.redirect('/customer-care/employ/wound-cleaning-schedule');
			})
			.catch(next);
	}

	// Chi tiết lịch hẹn thay băng
	// showWoundCleaningScheduleDetail(req, res, next) {
	// 	Promise.all([
	// 		WoundCleaningSchedule.findById({ _id: req.params.id }).populate('cusID').populate('serviceNoteID'),
	// 		User.findById({ _id: req.userId })
	// 	])
	// 	.then(([woundCleaningSchedule, user]) => {
	// 		res.render('customer-care/employ/employ-wound-cleaning-schedule-detail', {
	// 			woundCleaningSchedule: mongooseToObject(woundCleaningSchedule),
	// 			title: "Chi tiết lịch hẹn thay băng",
	// 			user: mongooseToObject(user)
	// 		})
	// 	})
	// 	.catch(next);
	// }

	// Tạo phiếu thay băng
	createWoundCleaning(req, res, next) {
		console.log(req.body);
		console.log(req.params);
		const woundCleaning = new WoundCleaning({
			woundCleaningScheduleID: req.body.woundCleaningScheduleID,
			serviceNoteID: req.body.serviceNoteID,
			cusID: req.body.cusID,
			userID: req.userId,
			isDone: false,
			status: 'Tạo mới'
		});
		woundCleaning.save();
		const woundCleaningID = woundCleaning._id;
		const logs = new Log({
			userID: req.userId,
			customerID: req.body.cusID,
			woundCleaningScheduleID: req.body.woundCleaningScheduleID,
			woundCleaningID: woundCleaningID,
			serviceNoteID: req.body.serviceNoteID,
			status: 'Tạo phiếu thay băng',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, {
				$set: { hasWoundCleaning: true },
				$push: { woundCleaningID: woundCleaningID, logIDs: logs._id }
			}),
			ServiceNote.findByIdAndUpdate({ _id: req.body.serviceNoteID }, { $push: { woundCleaningID: woundCleaningID } }),
			WoundCleaningSchedule.findByIdAndUpdate({ _id: req.body.woundCleaningScheduleID }, {
				$set: { woundCleaningID: woundCleaningID, hasWoundCleaning: true, status: 'Đang xử lý', userID: req.userId },
			})
		])
			.then(() => {
				req.flash('messages_createWoundCleaning_success', 'Tạo phiếu thay băng thành công');
				res.redirect(`/customer-care/employ/wound-cleaning`);
			})
			.catch(next);
	}

	// Hiển thị danh sách phiếu thay băng
	showWoundCleaning(req, res, next) {
		Promise.all([
			WoundCleaning.find({ isDone: false }).populate({
				path: 'cusID',
				model: 'Customer'
			}),
			User.findById({ _id: req.userId })
		])
			.then(([woundCleaning, user]) => {
				console.log(woundCleaning);
				res.render('customer-care/employ/employ-wound-cleaning-list', {
					woundCleaning: multipleMongooseToObject(woundCleaning),
					title: 'Danh sách phiếu thay băng',
					user: mongooseToObject(user)
				})
			})
			.catch(next);
	}

	// Hiển thị trang thùng rác phiếu thay băng
	showWoundCleaningTrash(req, res, next) {
		Promise.all([
			WoundCleaning.findDeleted({}).populate({
				path: 'serviceNoteID',
				model: 'ServiceNote'
			})
				.populate({
					path: 'cusID',
					model: 'Customer'
				})
				.populate({
					path: 'woundCleaningScheduleID',
					model: 'WoundCleaningSchedule'
				}),
			User.findById({ _id: req.userId }),
		])
			.then(([woundCleaning, user]) => {
				console.log(woundCleaning);
				res.render('customer-care/employ/employ-wound-cleaning-trash', {
					title: 'Phiếu thay băng đã hủy',
					woundCleaning: multipleMongooseToObject(woundCleaning),
					user: mongooseToObject(user)
				})
			})
			.catch(next);
	}

	// Hiển thị trang cập nhật phiếu thay băng
	showWoundCleaningUpdate(req, res, next) {
		Promise.all([
			WoundCleaning.findById({ _id: req.params.id }).populate({
				path: 'cusID',
				model: 'Customer'
			})
				.populate({
					path: 'woundCleaningScheduleID',
					model: 'WoundCleaningSchedule'
				})
				.populate({
					path: 'serviceNoteID',
					model: 'ServiceNote',
					populate: {
						path: 'performer',
						model: 'User'
					}
				})
				.populate({
					path: 'performer',
					model: 'User'
				}),
			User.findById({ _id: req.userId }),
			User.find({ $and: [{ departmentEng: 'operating-room' }, { positionEng: 'doctor' }] })
		])
			.then(([woundCleaning, user, users]) => {
				console.log(woundCleaning);
				res.render('customer-care/employ/employ-wound-cleaning-update', {
					user: mongooseToObject(user),
					title: 'Cập nhật thông tin phiếu thay băng',
					woundCleaning: mongooseToObject(woundCleaning),
					users: multipleMongooseToObject(users)
				})
			})
			.catch(next);
	}


	// Xóa phiếu thay băng
	deleteWoundCleaning(req, res, next) {
		console.log(req.body)
		console.log(req.params)
		const logs = new Log({
			customerID: req.body.cusID,
			woundCleaningID: req.params.id,
			serviceNoteID: req.body.serviceNoteID,
			woundCleaningScheduleID: req.body.woundCleaningScheduleID,
			userID: req.userId,
			status: 'Xóa phiếu thay băng',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, {
				hasWoundCleaningSchedule: false,
				hasWoundCleaning: false,
				statusCus: { statusVi: 'Xóa phiếu thay băng', statusEng: 'deletedWoundCleaning' },
				$push: { logIDs: logs._id }
			}),
			WoundCleaningSchedule.findByIdAndUpdate({ _id: req.body.woundCleaningScheduleID }, { hasWoundCleaning: false }),
			WoundCleaning.delete({ _id: req.params.id })
		])
			.then(() => {
				req.flash('messages_deleteWoundCleaning_success', 'Xóa phiếu thay băng thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Khôi phục phiếu thay băng
	restoreWoundCleaning(req, res, next) {
		console.log(req.body)
		console.log(req.params)
		const logs = new Log({
			customerID: req.body.cusID,
			woundCleaningID: req.params.id,
			serviceNoteID: req.body.serviceNoteID,
			woundCleaningScheduleID: req.body.woundCleaningScheduleID,
			userID: req.userId,
			status: 'Khôi phục phiếu thay băng',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, {
				hasWoundCleaningSchedule: true,
				hasWoundCleaning: true,
				statusCus: { statusVi: 'Khôi phục phiếu thay băng', statusEng: 'restoredWoundCleaning' },
				$push: { logIDs: logs._id }
			}),
			WoundCleaningSchedule.findByIdAndUpdate({ _id: req.body.woundCleaningScheduleID }, { hasWoundCleaning: true }),
			WoundCleaning.restore({ _id: req.params.id })
		])
			.then(() => {
				req.flash('messages_restoreWoundCleaning_success', 'Khôi phục phiếu thay băng thành công');
				res.redirect('/customer-care/employ/wound-cleaning');
			})
			.catch(next);
	}

	// Tải hình ảnh và video thay băng cắt chỉ
	uploadWoundCleaning(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			woundCleaningID: req.params.id,
			userID: req.userId,
			status: 'Cập nhật hình ảnh và video thay băng cắt chỉ',
			contents: req.body
		});
		logs.save();
		const file = req.files;
		const imgArr = [];
		const videoArr = []
		file.forEach(element => {
			if (element.mimetype === 'image/jpg' || element.mimetype === 'image/jpeg' || element.mimetype === 'image/png' || element.mimetype === 'image/avif' || element.mimetype === 'image/webp') {
				imgArr.push({ name: element.filename, url: element.path, notDeletedYet: true });
				return imgArr;
			} else if (element.mimetype === 'video/avi' || element.mimetype === 'video/flv' || element.mimetype === 'video/wmv' || element.mimetype === 'video/quicktime' || element.mimetype === 'video/mp4' || element.mimetype === 'video/webm') {
				videoArr.push({ name: element.filename, url: element.path, notDeletedYet: true });
				return videoArr;
			}
		})
		let updateStatus = {
			$set: { statusCus: { statusVi: 'Đã cập nhật hình ảnh và video thay băng cắt chỉ', statusEng: 'uploadedWoundCleaning' } },
			$push: { logIDs: logs._id }
		}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateStatus),
			WoundCleaning.findByIdAndUpdate({ _id: req.params.id }, {
				$push: {
					woundCleaningImg: imgArr,
					woundCleaningVideo: videoArr
				},
				$set: {
					statusInfo: req.body.statusInfo,
					directedByDoctor: req.body.directedByDoctor,
					stepsToTake: req.body.stepsToTake,
					woundCleaningArea: req.body.woundCleaningArea,
					woundCleaningDay: req.body.woundCleaningDay,
					performer: req.body.performer
				}
			})
		])
			.then(() => {
				req.flash('messages_uploadWoundCleaning_success', 'Cập nhật hình ảnh và video thay băng cắt chỉ thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Xóa ảnh thay băng cắt chỉ
	deleteWoundCleaningImg(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			woundCleaningID: req.params.id,
			userID: req.userId,
			status: 'Xóa hình ảnh thay băng cắt chỉ',
			contents: req.body
		});
		logs.save();
		let imgName = req.body.imgName;
		const arrayFilters = [];
		arrayFilters.push({ name: imgName });
		const options = { "arrayFilters": arrayFilters }
		const updateDocument = { $set: { "woundCleaningImg.$.notDeletedYet": false } }
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id } }),
			WoundCleaning.findById({ _id: req.params.id }).updateMany({ ['woundCleaningImg.name']: req.body.imgName }, updateDocument, options)
		])
			.then(() => {
				req.flash('messages_deletedWoundCleaningImg_success', 'Xóa hình ảnh thay băng thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Khôi phục ảnh thay băng cắt chỉ
	restoreWoundCleaningImg(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			woundCleaningID: req.params.id,
			userID: req.userId,
			status: 'Khôi phục hình ảnh thay băng cắt chỉ',
			contents: req.body
		});
		logs.save();
		let imgName = req.body.imgName;
		const arrayFilters = [];
		arrayFilters.push({ name: imgName });
		const options = { "arrayFilters": arrayFilters }
		const updateDocument = { $set: { "woundCleaningImg.$.notDeletedYet": true } }
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id } }),
			WoundCleaning.findById({ _id: req.params.id }).updateMany({ ['woundCleaningImg.name']: req.body.imgName }, updateDocument, options)
		])
			.then(() => {
				req.flash('messages_restoreWoundCleaningImg_success', 'Khôi phục hình ảnh thay băng thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Xóa video thay băng cắt chỉ
	deleteWoundCleaningVideo(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			woundCleaningID: req.params.id,
			userID: req.userId,
			status: 'Xóa video thay băng cắt chỉ',
			contents: req.body
		});
		logs.save();
		let videoName = req.body.videoName;
		const arrayFilters = [];
		arrayFilters.push({ name: videoName });
		const options = { "arrayFilters": arrayFilters }
		const updateDocument = { $set: { "woundCleaningVideo.$.notDeletedYet": false } }
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id } }),
			WoundCleaning.findById({ _id: req.params.id }).updateMany({ ['woundCleaningVideo.name']: req.body.videoName }, updateDocument, options)
		])
			.then(() => {
				req.flash('messages_deletedWoundCleaningVideo_success', 'Xóa video thay băng thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Khôi phục video phẫu thuật
	restoreWoundCleaningVideo(req, res, next) {
		console.log(req.body);
		console.log(req.params);
		const logs = new Log({
			customerID: req.body.cusID,
			woundCleaningID: req.params.id,
			userID: req.userId,
			status: 'Khôi phục video thay băng cắt chỉ',
			contents: req.body
		});
		logs.save();
		let videoName = req.body.videoName;
		const arrayFilters = [];
		arrayFilters.push({ name: videoName });
		const options = { "arrayFilters": arrayFilters }
		const updateDocument = { $set: { "woundCleaningVideo.$.notDeletedYet": true } }
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id } }),
			WoundCleaning.findById({ _id: req.params.id }).updateMany({ ['woundCleaningVideo.name']: req.body.videoName }, updateDocument, options)
		])
			.then(() => {
				req.flash('messages_restoreWoundCleaningVideo_success', 'Khôi phục video thay băng thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Hiển thị chi tiết phiếu thay băng
	showWoundCleaningDetail(req, res, next) {
		Promise.all([
			WoundCleaning.findById({ _id: req.params.id }).populate({
				path: 'cusID',
				model: 'Customer'
			})
				.populate({
					path: 'serviceNoteID',
					model: 'ServiceNote',
					populate: {
						path: 'performer',
						model: 'User'
					}
				})
				.populate({
					path: 'woundCleaningScheduleID',
					model: 'WoundCleaningSchedule'
				}),
			User.findById({ _id: req.userId })
		])
			.then(([woundCleaning, user]) => {
				console.log(woundCleaning);
				res.render('customer-care/employ/employ-wound-cleaning-detail', {
					woundCleaning: mongooseToObject(woundCleaning),
					title: "Chi tiết phiếu thay băng",
					user: mongooseToObject(user)
				})
			})
			.catch(next);
	}

	// Cập nhật hoàn thành phiếu thay băng
	updateWoundCleaningDone(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			woundCleaningID: req.params.id,
			woundCleaningScheduleID: req.body.woundCleaningScheduleID,
			serviceNoteID: req.body.serviceNoteID,
			userID: req.userId,
			status: 'Hoàn thành phiếu thay băng',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id }, $set: { statusCus: { statusVi: 'Hoàn thành thay băng' } } }),
			ServiceNote.findByIdAndUpdate({ _id: req.body.serviceNoteID }, { $set: { hasWoundCleaningSchedule: false, status: 'Chăm sóc hậu phẫu' } }),
			WoundCleaningSchedule.findByIdAndUpdate({ _id: req.body.woundCleaningScheduleID }, { $set: { isDone: true, status: 'Hoàn thành' } }),
			WoundCleaning.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: "Hoàn thành", isDone: true } }),
		])
			.then(() => {
				req.flash('messages_updateReExamDone_success', 'Cập nhật trạng thái hoàn thành phiếu thay băng thành công');
				res.redirect('/customer-care/employ/wound-cleaning');
			})
			.catch(next);
	}

	// Chuyển khách hàng sang tái khám định kỳ
	moveToReExamination(req, res, next) {
		console.log(req.body);
		console.log(req.params);
		const logs = new Log({
			customerID: req.body.cusID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Chuyển khách sang tái khám định kỳ',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { isPeriodicReExamination: true, $push: { logIDs: logs._id } }),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $set: { isPeriodicReExamination: true, hasReExamSchedule: false, hasWoundCleaningSchedule: true, hasWoundCleaning: true, status: 'Tái khám định kỳ' } })
		])
			.then(() => {
				req.flash('messages_moveServiceNoteToReExam_success', 'Chuyển khách sang tái khám định kỳ thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Hiển thị trang danh sách khách hàng tái khám định kỳ
	showCustomerReExamination(req, res, next) {
		Promise.all([
			ServiceNote.find({ $and: [{ isPeriodicReExamination: true }, { hasReExamSchedule: false }] }).populate({
				path: 'scheduleID',
				model: 'Schedule',
				populate: {
					path: 'cusID',
					model: 'Customer'
				}
			}).sort({ updatedAt: 1 }),
			User.findById({ _id: req.userId })
		])
			.then(([serviceNotes, user]) => {
				res.render('customer-care/employ/employ-customer-re-exam', {
					serviceNotes: multipleMongooseToObject(serviceNotes),
					title: 'Danh sách khách tái khám định kỳ',
					user: mongooseToObject(user)
				})
			})
			.catch(next);

	}

	// Tạo lịch tái khám
	createReExamSchedule(req, res, next) {
		const reExamSchedule = new ReExaminationSchedule({
			userID: req.userId,
			cusID: req.body.cusID,
			serviceNoteID: req.params.id,
			status: 'Tạo mới',
			schedule: req.body.schedule,
			times: req.body.times,
			hasReExam: false
		})
		reExamSchedule.save();
		const reExamScheduleID = reExamSchedule._id;
		const logs = new Log({
			customerID: req.body.cusID,
			reExamScheduleID: reExamScheduleID,
			serviceNoteID: req.params.id,
			userID: req.userId,
			status: 'Tạo lịch hẹn tái khám',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { reExamScheduleID: reExamScheduleID, logIDs: logs._id }, $set: { hasReExamSchedule: true } }),
			ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { reExamScheduleID: reExamScheduleID }, $set: { hasReExamSchedule: true } })
		])
			.then(() => {
				req.flash('messages_createReExaminationSchedule_success', 'Tạo lịch hẹn tái khám thành công');
				res.redirect("back");
			})
			.catch(next);
	}

	// Hiển thị trang danh sách lịch hẹn tái khám
	showReExaminationSchedule(req, res, next) {
		Promise.all([
			ReExaminationSchedule.find({ hasReExam: false })
				.populate({
					path: 'cusID',
					model: 'Customer'
				})
				.populate({
					path: 'serviceNoteID',
					model: 'ServiceNote'
				}).sort({ schedule: 1 }),
			User.findById({ _id: req.userId })
		])
			.then(([reExamSchedule, user]) => {
				console.log(reExamSchedule);
				res.render('customer-care/employ/employ-re-examination-schedule', {
					title: 'Danh sách lịch hẹn tái khám định kỳ',
					user: mongooseToObject(user),
					reExamSchedule: multipleMongooseToObject(reExamSchedule)
				})
			})
			.catch(next);

	}

	// Hiển thị trang thùng rác lịch hẹn tái khám
	showReExaminationScheduleTrash(req, res, next) {
		Promise.all([
			ReExaminationSchedule.findDeleted({}).populate({
				path: 'serviceNoteID',
				model: 'ServiceNote'
			})
				.populate({
					path: 'cusID',
					model: 'Customer'
				}),
			User.findById({ _id: req.userId }),
		])
			.then(([reExamSchedule, user]) => {
				console.log(reExamSchedule);
				res.render('customer-care/employ/employ-re-examination-schedule-trash', {
					title: 'Lịch tái khám đã hủy',
					reExamSchedule: multipleMongooseToObject(reExamSchedule),
					user: mongooseToObject(user)
				})
			})
			.catch(next);
	}

	// Sửa lịch hẹn tái khám đinh kỳ
	editReExamSchedule(req, res, next) {
		console.log(req.body);
		console.log(req.params);
		const logs = new Log({
			customerID: req.body.cusID,
			userID: req.userId,
			reExamScheduleID: req.params.id,
			status: 'Sửa lịch hẹn tái khám',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id } }),
			ReExaminationSchedule.findByIdAndUpdate({ _id: req.params.id }, { schedule: req.body.schedule, $push: { reasons: req.body.reason } })
		])
			.then(() => {
				req.flash('messages_editReExamSchedule_success', 'Sửa lịch hẹn tái khám thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Xóa lịch hẹn tái khám định kỳ
	deleteReExamSchedule(req, res, next) {
		console.log(req.body)
		console.log(req.params)
		const logs = new Log({
			customerID: req.body.cusID,
			reExamScheduleID: req.params.id,
			serviceNoteID: req.body.serviceNoteID,
			userID: req.userId,
			status: 'Xóa lịch hẹn tái khám',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, {
				hasReExamSchedule: false,
				statusCus: { statusVi: 'Xóa lịch hẹn tái khám', statusEng: 'deletedReExamSchedule' },
				$push: { logIDs: logs._id }
			}),
			ServiceNote.findByIdAndUpdate({ _id: req.body.serviceNoteID }, { hasReExamSchedule: false }),
			ReExaminationSchedule.delete({ _id: req.params.id })
		])
			.then(() => {
				req.flash('messages_deleteReExamSchedule_success', 'Xóa lịch hẹn tái khám thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Khôi phục lịch hẹn tái khám định kỳ
	restoreReExamSchedule(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			reExamScheduleID: req.params.id,
			serviceNoteID: req.body.serviceNoteID,
			userID: req.userId,
			status: 'Khôi phục lịch hẹn tái khám',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, {
				hasReExamSchedule: true,
				statusCus: { statusVi: 'Khôi phục lịch hẹn tái khám', statusEng: 'restoredReExamSchedule' },
				$push: { logIDs: logs._id }
			}),
			ServiceNote.findByIdAndUpdate({ _id: req.body.serviceNoteID }, { hasReExamSchedule: true }),
			ReExaminationSchedule.restore({ _id: req.params.id })
		])
			.then(() => {
				req.flash('messages_restoreReExamSchedule_success', 'Khôi phục lịch hẹn tái khám thành công');
				res.redirect('/customer-care/employ/re-exam-schedule');
			})
			.catch(next);
	}

	// Chi tiết lịch hẹn thay băng (chỉnh sửa sau)
	// showReExamScheduleDetail(req, res, next) {
	// 	Promise.all([
	// 		ReExaminationSchedule.findById({ _id: req.params.id }).populate({
	// 			path:'cusID',
	// 			model: 'Customer'
	// 		})
	// 		.populate({
	// 			path: 'serviceNoteID',
	// 			model: 'ServiceNote',
	// 			populate: {
	// 				path: 'woundCleaningID',
	// 				model: 'WoundCleaning'
	// 			}
	// 		}),
	// 		User.findById({ _id: req.userId })
	// 	])
	// 	.then(([reExamSchedule, user]) => {

	// 		res.render('customer-care/employ/employ-re-examination-schedule-detail', {
	// 			reExamSchedule: mongooseToObject(reExamSchedule),
	// 			title: "Chi tiết lịch hẹn tái khám",
	// 			user: mongooseToObject(user)
	// 		})
	// 	})
	// 	.catch(next);
	// }

	// Tạo phiếu tái khám định kỳ
	createReExam(req, res, next) {
		console.log(req.body);
		const reExamination = new Reexamination({
			reExamScheduleID: req.body.reExamScheduleID,
			serviceNoteID: req.body.serviceNoteID,
			cusID: req.body.cusID,
			userID: req.userId,
			isDone: false,
			status: 'Tạo mới'
		});
		reExamination.save();
		const reExaminationID = reExamination._id;
		const logs = new Log({
			userID: req.userId,
			customerID: req.body.cusID,
			reExamScheduleID: req.body.reExamScheduleID,
			reExamID: reExaminationID,
			serviceNoteID: req.body.serviceNoteID,
			status: 'Tạo phiếu tái khám',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, {
				$set: { hasReExam: true },
				$push: { reexamID: reExaminationID, logIDs: logs._id }
			}),
			ServiceNote.findByIdAndUpdate({ _id: req.body.serviceNoteID }, { $push: { reExamID: reExaminationID } }),
			ReExaminationSchedule.findByIdAndUpdate({ _id: req.body.reExamScheduleID }, {
				$set: { reexamID: reExaminationID, hasReExam: true, status: 'Đã tạo phiếu tái khám', userID: req.userId },
			})
		])
			.then(() => {
				req.flash('messages_createReExamination_success', 'Tạo phiếu tái khám thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Hiển thị danh sách phiếu tái khám
	showReExamination(req, res, next) {
		Promise.all([
			Reexamination.find({ isDone: false }).populate('cusID').populate('userID').populate('reExamScheduleID').populate('serviceNoteID').sort({ schedule: 1 }),
			User.findById({ _id: req.userId })])
			.then(([reExams, user]) => {
				res.render('customer-care/employ/employ-re-examination', {
					title: 'Danh sách phiếu tái khám',
					user: mongooseToObject(user),
					reExams: multipleMongooseToObject(reExams)
				})
			})
			.catch(next);
	}

	// Hiển thị trang thùng rác phiếu tái khám
	showReExaminationTrash(req, res, next) {
		Promise.all([
			Reexamination.findDeleted({}).populate({
				path: 'serviceNoteID',
				model: 'ServiceNote'
			})
				.populate({
					path: 'cusID',
					model: 'Customer'
				})
				.populate({
					path: 'reExamScheduleID',
					model: 'ReExaminationSchedule'
				}),
			User.findById({ _id: req.userId }),
		])
			.then(([reExams, user]) => {
				console.log(reExams);
				res.render('customer-care/employ/employ-re-exam-trash', {
					title: 'Phiếu tái khám đã hủy',
					reExams: multipleMongooseToObject(reExams),
					user: mongooseToObject(user)
				})
			})
			.catch(next);
	}

	// Hiển thị trang cập nhật phiếu tái khám
	showReExamUpdate(req, res, next) {
		Promise.all([
			Reexamination.findById({ _id: req.params.id }).populate({
				path: 'cusID',
				model: 'Customer',

			}).populate({
				path: 'reExamScheduleID',
				model: 'ReExaminationSchedule'
			}).populate({
				path: 'serviceNoteID',
				model: 'ServiceNote',
				populate: [{
					path: 'performer',
					model: 'User'
				},
				{
					path: 'woundCleaningScheduleID',
					model: 'WoundCleaningSchedule',
					populate: {
						path: 'woundCleaningID',
						model: 'WoundCleaning'
					}
				}]
			}).populate({
				path: 'performer',
				model: 'User'
			}),
			User.findById({ _id: req.userId }),
			User.find({ $and: [{ departmentEng: 'operating-room' }, { positionEng: 'doctor' }] })
		])
			.then(([reExam, user, users]) => {
				res.render('customer-care/employ/employ-re-exam-update', {
					reExam: mongooseToObject(reExam),
					user: mongooseToObject(user),
					title: 'Cập nhật thông tin phiếu tái khám',
					users: multipleMongooseToObject(users)
				})
			})
	}

	// Tải lên hình ảnh phiếu tái khám
	async uploadReExamImg(req, res, next) {
		console.log(req.files);
		try {
			const files = req.files;
			const uploadedImages = [];
			const dateNow = new Date().toISOString();
			const resizeOpts = { width: 512, height: 1024 };

			await Promise.all(
				files.map(async file => {
					if (
						file.mimetype === 'image/jpg' || 
						file.mimetype === 'image/jpeg' || 
						file.mimetype === 'image/png' || 
						file.mimetype === 'image/avif' ||
						file.mimetype === 'image/webp'
					) {
						const imageName = `${file.fieldname}_img_${req.body.cusID}_${dateNow}_${Date.now()}.${path.extname(file.originalname)}`;

						const buffer = await sharp(file.path)
							.resize(resizeOpts)
							.toFormat('webp')
							// .toFile(`${appRoot}/src/public/re-examination/img/${imageName}`, function(err){
								// if(err){
								// 	res.status(500).json({ message: `Đã xảy ra lỗi: ${err}` });
								// 	return;
								// }
								// console.log(err);
								// res.status(200).json({ message: 'Hoàn thành quá trình tải ảnh'});
							// });
						
						// next();

						// Tính toán dung lượng hình ảnh
						// const dimensions = sizeOf(buffer);
						// const fileSizeInBytes = file.size;
						// const fileSizeInKB = fileSizeInBytes / 1024;
						// const fileSizeInMB = fileSizeInKB / 1024;
		
						// Thêm thông tin về hình ảnh đã tải lên vào mảng uploadedImages
						// uploadedImages.push({
						// 	name: imageName,
						// 	size: {
						// 		width: dimensions.width,
						// 		height: dimensions.height,
						// 		bytes: fileSizeInBytes,
						// 		kilobytes: fileSizeInKB,
						// 		megabytes: fileSizeInMB.toFixed(2)
						// 	}
						// });

						// Xóa tệp ảnh tạm thời
						// await fs.unlink(file.path);
					}
				})
			);

			// Phản hồi về phía giao diện người dùng với danh sách các hình ảnh đã tải lên và kích thước của chúng
			res.status(200).json({ images: 'Tải hình ảnh thành công' });
			// res.redirect("back");
		} catch(err) {
			console.log(`Một lỗi đã xảy ra trong quá trình xử lý: ${err}`);
			res.status(500).send(err);
		}
	}

	// Tải lên video phiếu tái khám
	async uploadReExamVideo(req, res, next) {
		try {
			const files = req.files;
			const date = new Date();
			const getDate = date.getDate();
			const getMonth = date.getMonth();
			const getYear = date.getFullYear();
			const dateNow = 'createdAt-' + getDate + (getMonth + 1) + getYear;
			for (const file of files) {
				if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/avif' || file.mimetype === 'image/webp') {
					const imageName = `${file.fieldname}_img_${req.body.cusID}_${dateNow}_${Date.now()}.${path.extname(file.originalname)}`;
					const image = await sharp(file.path).resize(512, 1024).webp({ quality: 80 }).toFile(`${appRoot}/src/public/re-examination/img/${imageName}`);
					// console.log('điểm cuối', image.options.input.file);

					// Xóa tệp ảnh tạm thời
					fs.unlinkSync(file.path);

					// .then(img => {
					// 	// Tạo một luồng dữ liệu từ ảnh đã nén
					// 	const stream = image.pipe(img);
					// 	// // Gửi phản hồi với luồng dữ liệu từ ảnh đã nén
					// 	res.writeHead(200, { 'Content-Type': 'image/webp' });
					// 	stream.on('data', chunk => {
					// 		res.write(chunk);
					// 	});
					// 	stream.on('end', () => {
					// 		res.end();
					// 	});
					// })
					// .catch(next);
				} else if (file.mimetype === 'video/avi' || file.mimetype === 'video/flv' || file.mimetype === 'video/wmv' || file.mimetype === 'video/quicktime' || file.mimetype === 'video/mov' || file.mimetype === 'video/MOV' || file.mimetype === 'video/mp4' || file.mimetype === 'video/webm') {
					console.log('video file', file);

					// const video = await sharp(file.path).resize(1920, 1080);
					// console.log('video', video);
					// const videoName = `${file.fieldname}_video_${req.body.cusID}_${dateNow}_${Date.now()}.${video.options.formatOut}`;
					// console.log(video.options.formatOut);
					// video.toFile(`${appRoot}/src/public/re-examination/video/${videoName}`);
				}

				// const resizedImage = await image
				// 		.resize(300, 300)
				// 		.toFormat('webp')
				// 		.webp({ quality: 20 })
				// 		.toFile(imageName)
				// 		.then(images => {

				// 			// Tạo một luồng dữ liệu từ ảnh đã nén
				// 			const stream = images.pipe();
				// 			// console.log('stream', stream);

				// 			//Xóa tệp ảnh tạm thời
				// 			fs.unlinkSync(file.path);
				// 			// Gửi phản hồi với luồng dữ liệu từ ảnh đã nén
				// 			res.writeHead(200, { 'Content-Type': 'image/webp' });
				// 			stream.on('data', chunk => {
				// 				res.write(chunk);
				// 			});
				// 			stream.on('end', () => {
				// 				res.end();
				// 			});
				// 			console.log(images);
				// 		})
				// 		.catch(next);
			}
		} catch (error) {
			console.log(`An error occurred during processing: ${error}`);
		}
	}

	// Cập nhật thông tin phiếu tái khám
	uploadReExam(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			reExamID: req.params.id,
			userID: req.userId,
			status: 'Cập nhật hình ảnh và video tái khám',
			contents: req.body
		});
		logs.save();
		let updateStatus = {
			$set: { statusCus: { statusVi: 'Đã cập nhật hình ảnh và video tái khám', statusEng: 'uploadedReExam' } },
			$push: { logIDs: logs._id }
		}
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, updateStatus),
			Reexamination.findByIdAndUpdate({ _id: req.params.id }, {
				$set: {
					reExaminationDate: req.body.reExaminationDate,
					reExaminationArea: req.body.reExaminationArea,
					statusInfo: req.body.statusInfo,
					directedByDoctor: req.body.directedByDoctor,
					stepsToTake: req.body.stepsToTake,
					performer: req.body.performer
				}
			})
		])
			.then(() => {
				req.flash('messages_uploadReExam_success', 'Cập nhật hình ảnh và video tái khám thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Xóa ảnh tái khám
	deleteReExamImg(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			reExamID: req.params.id,
			userID: req.userId,
			status: 'Xóa hình ảnh thay băng cắt chỉ',
			contents: req.body
		});
		logs.save();
		let imgName = req.body.imgName;
		const arrayFilters = [];
		arrayFilters.push({ name: imgName });
		const options = { "arrayFilters": arrayFilters }
		const updateDocument = { $set: { "reExamImg.$.notDeletedYet": false } }
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id } }),
			Reexamination.findById({ _id: req.params.id }).updateMany({ ['reExamImg.name']: req.body.imgName }, updateDocument, options)
		])
			.then(() => {
				req.flash('messages_deletedReExamImg_success', 'Xóa hình ảnh tái khám thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Khôi phục ảnh tái khám
	restoreReExamImg(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			reExamID: req.params.id,
			userID: req.userId,
			status: 'Khôi phục hình ảnh tái khám',
			contents: req.body
		});
		logs.save();
		let imgName = req.body.imgName;
		const arrayFilters = [];
		arrayFilters.push({ name: imgName });
		const options = { "arrayFilters": arrayFilters }
		const updateDocument = { $set: { "reExamImg.$.notDeletedYet": true } }
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id } }),
			Reexamination.findById({ _id: req.params.id }).updateMany({ ['reExamImg.name']: req.body.imgName }, updateDocument, options)
		])
			.then(() => {
				req.flash('messages_restoreReExamImg_success', 'Khôi phục hình ảnh tái khám thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Xóa video tái khám
	deleteReExamVideo(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			reExamID: req.params.id,
			userID: req.userId,
			status: 'Xóa video tái khám',
			contents: req.body
		});
		logs.save();
		let videoName = req.body.videoName;
		const arrayFilters = [];
		arrayFilters.push({ name: videoName });
		const options = { "arrayFilters": arrayFilters }
		const updateDocument = { $set: { "reExamVideo.$.notDeletedYet": false } }
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id } }),
			Reexamination.findById({ _id: req.params.id }).updateMany({ ['reExamVideo.name']: req.body.videoName }, updateDocument, options)
		])
			.then(() => {
				req.flash('messages_deletedReExamVideo_success', 'Xóa video tái khám thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Khôi phục video tái khám
	restoreReExamVideo(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			reExamID: req.params.id,
			userID: req.userId,
			status: 'Khôi phục video tái khám',
			contents: req.body
		});
		logs.save();
		let videoName = req.body.videoName;
		const arrayFilters = [];
		arrayFilters.push({ name: videoName });
		const options = { "arrayFilters": arrayFilters }
		const updateDocument = { $set: { "reExamVideo.$.notDeletedYet": true } }
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id } }),
			Reexamination.findById({ _id: req.params.id }).updateMany({ ['reExamVideo.name']: req.body.videoName }, updateDocument, options)
		])
			.then(() => {
				req.flash('messages_restoreReExamVideo_success', 'Khôi phục video tái khám thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Hiển thị trang chi tiết phiếu tái khám
	showReExaminationDetail(req, res, next) {
		Promise.all([
			Reexamination.findById({ _id: req.params.id }).populate({
				path: 'cusID',
				model: 'Customer'
			})
				.populate({
					path: 'serviceNoteID',
					model: 'ServiceNote',
					populate: {
						path: 'performer',
						model: 'User'
					}
				})
				.populate({
					path: 'userID',
					model: 'User'
				})
				.populate({
					path: 'reExamScheduleID',
					model: 'ReExaminationSchedule'
				})
				.populate({
					path: 'performer',
					model: 'User'
				}),
			User.findById({ _id: req.userId })
		])
			.then(([reExam, user]) => {
				console.log(reExam);
				res.render('customer-care/employ/employ-re-exam-detail', {
					reExam: mongooseToObject(reExam),
					title: "Chi tiết phiếu tái khám",
					user: mongooseToObject(user)
				})
			})
			.catch(next);
	}


	// Cập nhật hoàn thành phiếu tái khám
	updateReExamDone(req, res, next) {
		const logs = new Log({
			customerID: req.body.cusID,
			reExamID: req.params.id,
			reExamScheduleID: req.body.reExamScheduleID,
			serviceNoteID: req.body.serviceNoteID,
			userID: req.userId,
			status: 'Khôi phục video tái khám',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, { $push: { logIDs: logs._id }, $set: { isDone: true, statusCus: { statusVi: 'Hoàn thành tái khám' } } }),
			ServiceNote.findByIdAndUpdate({ _id: req.body.serviceNoteID }, { $set: { hasReExamSchedule: false, status: 'Hoàn thành tái khám' } }),
			ReExaminationSchedule.findByIdAndUpdate({ _id: req.body.reExamScheduleID }, { $set: { isDone: true, status: 'Hoàn thành' } }),
			Reexamination.findByIdAndUpdate({ _id: req.params.id }, { $set: { status: "Hoàn thành", isDone: true } }),
		])
			.then(() => {
				req.flash('messages_updateReExamDone_success', 'Cập nhật trạng thái hoàn thành phiếu tái khám thành công');
				res.redirect('/customer-care/employ/re-exam');
			})
			.catch(next);
	}

	// Xóa phiếu tái khám
	deleteReExam(req, res, next) {
		console.log(req.body)
		console.log(req.params)
		const logs = new Log({
			customerID: req.body.cusID,
			reExamID: req.params.id,
			serviceNoteID: req.body.serviceNoteID,
			reExamScheduleID: req.body.reExamScheduleID,
			userID: req.userId,
			status: 'Xóa phiếu tái khám',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, {
				hasReExamSchedule: false,
				hasReExam: false,
				statusCus: { statusVi: 'Xóa phiếu tái khám', statusEng: 'deletedReExam' },
				$push: { logIDs: logs._id }
			}),
			ReExaminationSchedule.findByIdAndUpdate({ _id: req.body.reExamScheduleID }, { hasReExam: false }),
			Reexamination.delete({ _id: req.params.id })
		])
			.then(() => {
				req.flash('messages_deleteReExam_success', 'Xóa phiếu tái khám thành công');
				res.redirect('back');
			})
			.catch(next);
	}

	// Khôi phục phiếu tái khám
	restoreReExam(req, res, next) {
		console.log(req.body)
		console.log(req.params)
		const logs = new Log({
			customerID: req.body.cusID,
			reExamID: req.params.id,
			serviceNoteID: req.body.serviceNoteID,
			reExamScheduleID: req.body.reExamScheduleID,
			userID: req.userId,
			status: 'Khôi phục phiếu tái khám',
			contents: req.body
		});
		logs.save();
		Promise.all([
			Customer.findByIdAndUpdate({ _id: req.body.cusID }, {
				hasReExamSchedule: true,
				hasReExam: true,
				statusCus: { statusVi: 'Khôi phục phiếu tái khám', statusEng: 'restoredReExam' },
				$push: { logIDs: logs._id }
			}),
			ReExaminationSchedule.findByIdAndUpdate({ _id: req.body.reExamScheduleID }, { hasReExam: true }),
			Reexamination.restore({ _id: req.params.id })
		])
			.then(() => {
				req.flash('messages_restoreReExam_success', 'Khôi phục phiếu tái khám thành công');
				res.redirect('/customer-care/employ/re-exam');
			})
			.catch(next);
	}

	// Lưu hồ sơ khách hàng vào kho
	// move

	// Hiển thị hồ sơ lưu trữ khách hàng (chỉnh sửa)
	showStorage(req, res, next) {
		Customer.find({ statusCus: { statusVi: 'Lưu hồ sơ', statusEng: 'records' }, storage: 'Yes' }).populate('serviceNoteID')
			.then(customers => {
				res.render('customer-care/employ/employ-customer-storage', {
					customers: multipleMongooseToObject(customers),
					title: "Kho hồ sơ khách hàng"
				})
			})
			.catch(next);
	}

	// Hiển thị chi tiết khách hàng trong kho hồ sơ (chỉnh sửa)
	showCustomerStorageDetail(req, res, next) {
		Customer.findById({ _id: req.params.id }).populate({
			path: 'serviceNoteID',
			match: {
				status: 'Lưu hồ sơ'
			},
			populate: {
				path: 'performer'
			}
		})
			.then((customer) => {
				res.render('customer-care/employ/employ-customer-storage-detail', {
					title: 'Chi tiết khách hàng',
					customer: mongooseToObject(customer)
				})
			})
			.catch(next);
	}
}

module.exports = new EmployCustomerCareController();
