import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as fs from 'fs';
const stream = require('stream');

@Injectable()
export class GoogleDriveService {
  private drive;
  constructor() {
    const keyFile = JSON.parse(fs.readFileSync('googlekey.json', 'utf8'));
    const auth = new google.auth.GoogleAuth({
      credentials: keyFile,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });
    this.drive = google.drive({ version: 'v3', auth });
    const privateKey = process.env.PRIVATE_KEY.replace(/\\n/g, '\n');

    const keyFilef2 = {
      type: process.env.TYPE,
      project_id: process.env.PROJECT_ID,
      private_key_id: process.env.PRIVATE_KEY_ID,
      private_key: privateKey,
      client_email: process.env.CLIENT_EMAIL,
      client_id: process.env.CLIENT_ID,
    };
    const auth2 = new google.auth.GoogleAuth({
      credentials: keyFilef2,
      scopes: ['https://www.googleapis.com/auth/drive'],
    });

    this.drive = google.drive({ version: 'v3', auth });
  }
  async uploadfile(file: any) {
    const fileMetadata = {
      name: file.profile[0].originalname,
    };

    const media = {
      mimeType: file.profile[0].mimetype,
      body: stream.Readable.from(file.profile[0].buffer),
    };

    try {
      const response = await this.drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id,webViewLink',
      });
      const fileId = response.data.id;
      const filerl = response.data.webViewLink;
      return filerl;
    } catch (error) {
      console.log(error);
      return error;
    }
  }

  async uploadFile(file: any) {
    try {
      const filemetaData = {
        name: file.originalname,
      };
      const mediFiles = {
        mimeType: file.mimetype,
        body: stream.Readable.from(file.buffer),
      };
      const response = await this.drive.files.create({
        resource: filemetaData,
        media: mediFiles,
        fields: 'id,webViewLink',
      });
      const fileId = response.data.id;
      const filerl = response.data.webViewLink;
      return filerl;
    } catch (error) {}
  }



  async chatFilesUpload(file: any) {
    try {
      const filemetaData = {
        name: file.originalname,
      };
      const mediFiles = {
        mimeType: file.mimetype,
        body: stream.Readable.from(file.buffer),
      };
      const response = await this.drive.files.create({
        resource: filemetaData,
        media: mediFiles,
        fields: 'id,webViewLink',
      });
      const fileId = response.data.id;
      const filerl = response.data.webViewLink;
      return filerl;
    } catch (error) {}
  }


}
