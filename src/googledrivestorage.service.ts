import { Injectable } from '@nestjs/common';
import { google } from 'googleapis';
import * as fs from 'fs';
const stream = require('stream');

@Injectable()
export class GoogleDriveService{
    private drive;
    constructor(){
        const keyFile = JSON.parse(fs.readFileSync('googlekey.json', 'utf8'))
        const auth = new google.auth.GoogleAuth({
            credentials: keyFile, 
            scopes: ['https://www.googleapis.com/auth/drive'],
        })
        this.drive = google.drive({ version: 'v3', auth });
    } 
    async uploadfile(file:any){
      const fileMetadata={
        name:file.profile[0].originalname
      }

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
          const filerl=response.data.webViewLink
          return  filerl
      } catch (error) {
        console.log(error)
        return error;
      }
    }

}