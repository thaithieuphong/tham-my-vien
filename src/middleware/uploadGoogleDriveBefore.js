const Customer = require('../app/models/Customer');
require('dotenv').config();
const Before = require('../app/models/Before');
const { google } = require('googleapis');
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectURI = process.env.REDIRECT_URI;
const refreshTokenGG = process.env.REFRESH_TOKEN_GOOGLE;
const folderId = process.env.GOOGLE_API_FOLDER_ID;
const fs = require('fs');
const appRoot = require('app-root-path');
const path = require('path');

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectURI);
oAuth2Client.setCredentials({ refresh_token: refreshTokenGG });

const drive = google.drive({
	version: 'v3',
	auth: oAuth2Client,
})

class uploadGoogleDriveBefore {

	uploadDriveBefore(req, res, next) {
		const arrayFile = req.files;
		const pathName = path.join("/src", "public", "temp/");
		const files = fs.readdirSync(
			appRoot + pathName
		);
		// console.log(files)
		const findFolder = {
			q: "mimeType='application/vnd.google-apps.folder' and trashed=false",
			fields: 'nextPageToken, files(id, name)',
			spaces: 'drive',
		}
		Promise.all([Customer.findById({ _id: req.body.customerID }), drive.files.list(findFolder)])
			.then(([customer, list]) => {
				const fName = customer.firstName;
				const lName = customer.lastName;
				const birth = customer.birth.split('-');
				const newBirth = `${birth[2]}/${birth[1]}/${birth[0]}`;
				const folderCustomerName = `${fName} ${lName} ${newBirth}`;
				const arrayFolder = list.data.files;
				const currentFolder = arrayFolder.find(folder => {
					const folderName = folder.name;
					const folderCusId = folder.id;
					// neu thu muc chua ton tai thi tao thu muc sau do tao hinh anh trong thu muc do
					if (folderCusId === folderId && folderName !== folderCustomerName) {
						const folderCustomer = {
							mimeType: 'application/vnd.google-apps.folder',
							parents: [folderId],
							'name': folderCustomerName,
						}
						let folderDataId;
						const folderCustomerId = drive.files.create({
							resource: folderCustomer,
							fields: 'id'
						})
							.then(result => {
								folderDataId = result.data.id;
								return folderDataId;
							}).catch(next);
						arrayFile.forEach(element => {
							console.log(element);
							folderCustomerId.then(() => {
								const requestBody = { // cau hinh file tren drive
									name: element.filename,
									mimeType: element.mimetype,
									parents: [folderDataId] // id thu muc chua
								};
								const media = { // lay thong tin file tu he thong
									mimeType: element.mimetype,
									body: fs.createReadStream(`${appRoot}${pathName}${element.filename}`)

								};
								let arrImg = []
								let createFile = drive.files.create({
									resource: requestBody,
									media: media,
									fields: 'id',
								})
									.then(img => {
										const imgLocal = element.filename;
										const imgLocalPath = element.path;
										files.filter((img) => {
											if (img === imgLocal) {
												// console.log("img user", img);
												// console.log("path:", imgLocalPath)
												fs.unlinkSync(imgLocalPath);
											}
										});
										const imgId = img.data.id;
										let imgElement = {
											name: element.filename,
											id: imgId,
											mimeType: element.mimetype,
											folderId: folderDataId
										}
										const before = new Before({
											img: imgElement,
										})
										before.save();

										console.log("img name:", before.img.name);
										console.log("id:", before.id);
										return before;
									})
									.then((before) => {
										arrImg.push(before.id);
									});
							})
						});
						return { folderCusId, folderName };
					}
					if (folderName === folderCustomerName) { // neu thu muc da ton tai thi them hinh anh vao thu muc da co
						arrayFile.forEach(element => {
							const requestBody = { // cau hinh file tren drive
								name: element.filename,
								mimeType: element.mimetype,
								parents: [folder.id] // id thu muc chua
							};
							const media = { // lay thong tin file tu he thong
								mimeType: element.mimetype,
								body: fs.createReadStream(`${appRoot}${pathName}${element.filename}`)
							};

							let arrImg = []
							let createFile = drive.files.create({
								resource: requestBody,
								media: media,
								fields: 'id',
							})
								.then(img => {
									const imgLocal = element.filename;
									const imgLocalPath = element.path;
									files.filter((img) => {
										if (img === imgLocal) {
											// console.log("img user", img);
											fs.unlinkSync(imgLocalPath);
										}
									});
									const imgId = img.data.id;
									let imgElement = {
										name: element.filename,
										id: imgId,
										mimeType: element.mimetype,
										folderId: folder.id
									}
									const before = new Before({
										filename: element.filename,
										img: imgElement,
									})
									before.save();
									console.log("img name:", before.img.name);
									console.log("id:", before.id);
									
									return before;

								})
								.then((before) => {
									arrImg.push(before.id);
								});

						});
						return { folderCusId, folderName };
					};
				});
			})
			.catch(err => {
				console.log(err);
			})
		next();
		}
}

module.exports = new uploadGoogleDriveBefore;