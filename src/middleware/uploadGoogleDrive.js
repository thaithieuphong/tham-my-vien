require('dotenv').config();

const { google } = require('googleapis');
const clientId = process.env.CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const redirectURI = process.env.REDIRECT_URI;
const refreshTokenGG = process.env.REFRESH_TOKEN_GOOGLE;
const folderId = process.env.GOOGLE_API_FOLDER_ID;
const fs = require('fs');
const appRoot = require('app-root-path');
const { find } = require('../app/models/User');

const oAuth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectURI);
oAuth2Client.setCredentials({ refresh_token: refreshTokenGG });

const drive = google.drive({
	version: 'v3',
	auth: oAuth2Client,
})

class uploadGoogleDrive {
	async uploadDrive(req, res, next) {
		const files = await req.files; // mang chua file duoc tai len
		const folderCustomer = {
			title: 'gi cung duoc',
			mimeType: 'application/vnd.google-apps.folder',
			parents: [folderId],
			'name': 'abc'
		}		
		try {
			const createFolder = drive.files.create({
				resource: folderCustomer,
				fields: 'id',
			})
			files.forEach(element => { // lap qua cac file
				const createFile = drive.files.create({ // ham khoi tao file tren google drive
					requestBody: { // cau hinh file tren drive
						name: element.filename,
						mimeType: element.mimetype,
						parents: [folderId] // id thu muc chua
					},
					media: { // lay thong tin file tu he thong
						mimeType: element.mimetype,
						body: fs.createReadStream(`${appRoot}/src/public/temp/${element.filename}`)
					}
				})
			});
			console.log('create Folder', createFolder.data.id);
			console.log('data', createFolder.data);
		} catch (error) {

		}
		console.log('pass route');
		next();
	}
}

module.exports = new uploadGoogleDrive;