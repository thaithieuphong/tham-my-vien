const User = require('../../models/User');
const { multipleMongooseToObject, mongooseToObject } = require('../../../util/mongoose');
const ServiceNote = require('../../models/ServiceNote');
// const Counselor = require('../../models/Counselor');
const Reexamination = require('../../models/Reexamination');








class NursingController {
	showDashboard(req, res, next){
		res.render("operating/nursing/over-view")
	}

	showServiceNote(req, res, next) {
<<<<<<< HEAD
        ServiceNote.find({ stored: "No", status: "Đang xử lý", nursing: req.userId } ).populate('recept').populate('customerID').populate('performer').populate('nursing')
        .then((serviceNote) => {
            console.log(serviceNote.customerID)
            const cln = [];
            serviceNote.forEach(element => {
                let clns = element.counselorName;
                for( const element of clns){
                    cln.push(element);
                }
                return cln;

            })
            Counselor.find({ filename: {$in: cln} })
                .then((counselors) => {
                    res.render("operating/nursing/operating-service-note", {
                        serviceNote:  multipleMongooseToObject(serviceNote),
                        counselors: multipleMongooseToObject(counselors), 
                        title: "Chi tiết khách hàng"
                    });
                })
        })
        .catch(next);
    }

    updateServiceNote(req, res, next) {
        // res.json(req.body)
        // console.log(req.params.id)
        Promise.all([
            ServiceNote.find({_id: req.params.id}).updateOne({$set: {status: "Hoàn thành"}}),
            User.updateMany({_id: {$in: req.body.operatingID}},{$set: {state:"Medium"}})
        ])
                .then((serviceNote) => {
                    console.log("serviceNote:",serviceNote)
                    res.redirect('back')
                })
                .catch(next);
    }

    uploadBefore(req, res, next){
        console.log("req", req)
        res.redirect('back')
    }
=======
		ServiceNote.find({ stored: "No", status: "Đang xử lý", nursing: req.userId }).populate('recept').populate('customerID').populate('performer').populate('nursing')

			.then((serviceNote) => {
				// const cln = [];
				// serviceNote.forEach(element => {
				// 	let clns = element.counselorName;
				// 	for (const element of clns) {
				// 		cln.push(element);
				// 	}
				// 	return cln;

				// })
				// Counselor.find({ filename: { $in: cln } })
				// 	.then((counselors) => {
				res.render("operating/nursing/operating-service-note", {
					serviceNote: multipleMongooseToObject(serviceNote),

					// counselors: multipleMongooseToObject(counselors),
					title: "Chi tiết khách hàng"
				})
			})
			// })
			.catch(next);
	}

	showReExamination(req, res, next) {
		Reexamination.find({ stored: "No", status: "Đang xử lý", nursing: req.userId }).populate('recept').populate('customerID').populate('performer').populate('nursing').populate('serviceNoteId')
			.then((reExam) => {
				res.render("operating/nursing/operating-re-exam", {
					reExam: multipleMongooseToObject(reExam),

					title: "Chi tiết khách hàng"
				})
			})
			// })
			.catch(next);

	}

	updateServiceNote(req, res, next) {
		// res.json(req.body)
		// console.log(req.params.id)
		Promise.all([
			ServiceNote.find({ _id: req.params.id }).updateOne({ $set: { status: "Hoàn thành" } }),
			User.updateMany({ _id: { $in: req.body.operatingID } }, { $set: { state: "Medium" } })
		])
			.then(() => {
				res.redirect('back')
			})
			.catch(next);
	}

	updateReExamination(req, res, next) {
		// res.json(req.params)
		// console.log(req.params.id)
		Promise.all([
			Reexamination.find({ _id: req.params.id }).updateOne({ $set: { status: "Hoàn thành" } }),
			User.updateMany({ _id: { $in: req.body.operatingID } }, { $set: { state: "Medium" } })
		])
			.then(() => {
				res.redirect('back')
			})
			.catch(next);
	}


	uploadBefore(req, res, next) {
		const file = req.files;
		const fnimg = [];
		const fnvideo = []
		file.forEach(element => {
			if (element.mimetype === 'image/jpg' || element.mimetype === 'image/jpeg' || element.mimetype === 'image/png') {
				fnimg.push(element.filename);
				return fnimg;
			} else if (element.mimetype === 'video/avi' || element.mimetype === 'video/flv' || element.mimetype === 'video/wmv' || element.mimetype === 'video/mov' || element.mimetype === 'video/mp4' || element.mimetype === 'video/webm') {
				fnvideo.push(element.filename);
				return fnvideo;
			}
		})
		ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { beforeImg: fnimg, beforeVideo: fnvideo } })
			.then(() => {
				res.redirect('back')
			})
			.catch(next);
		// res.json(req.body)
	}

	uploadAfter(req, res, next) {
		const file = req.files;
		const fnimg = [];
		const fnvideo = []
		file.forEach(element => {
			if (element.mimetype === 'image/jpg' || element.mimetype === 'image/jpeg' || element.mimetype === 'image/png') {
				fnimg.push(element.filename);
				return fnimg;
			} else if (element.mimetype === 'video/avi' || element.mimetype === 'video/flv' || element.mimetype === 'video/wmv' || element.mimetype === 'video/mov' || element.mimetype === 'video/mp4' || element.mimetype === 'video/webm') {
				fnvideo.push(element.filename);
				return fnvideo;
			}
		})
		ServiceNote.findByIdAndUpdate({ _id: req.params.id }, { $push: { afterImg: fnimg, afterVideo: fnvideo } })
			.then(() => {
				res.redirect('back')
			})
			.catch(next);
	}

	uploadReExam(req, res, next) {
		const file = req.files;
		const fnimg = [];
		const fnvideo = []
		file.forEach(element => {
			if (element.mimetype === 'image/jpg' || element.mimetype === 'image/jpeg' || element.mimetype === 'image/png') {
				fnimg.push(element.filename);
				return fnimg;
			} else if (element.mimetype === 'video/avi' || element.mimetype === 'video/flv' || element.mimetype === 'video/wmv' || element.mimetype === 'video/mov' || element.mimetype === 'video/mp4' || element.mimetype === 'video/webm') {
				fnvideo.push(element.filename);
				return fnvideo;
			}
		})
		Reexamination.findByIdAndUpdate({ _id: req.params.id }, { $push: { reExamImg: fnimg, reExamVideo: fnvideo } })
			.then(() => {
				res.redirect('back')
			})
			.catch(next);
	}
>>>>>>> origin/vinh

}

module.exports = new NursingController;
