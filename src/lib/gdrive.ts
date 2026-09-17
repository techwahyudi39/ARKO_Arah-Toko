import { google } from 'googleapis';
import { Readable } from 'stream';

export async function uploadToGoogleDrive(
  fileBuffer: Buffer,
  fileName: string,
  mimeType: string
) {
  try {
    const clientEmail = process.env.GDRIVE_CLIENT_EMAIL;
    const privateKey = process.env.GDRIVE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const folderId = process.env.GDRIVE_FOLDER_ID;

    if (!clientEmail || !privateKey || !folderId) {
      throw new Error('Google Drive credentials are not properly configured.');
    }

    const auth = new google.auth.GoogleAuth({
      credentials: {
        client_email: clientEmail,
        private_key: privateKey,
      },
      scopes: ['https://www.googleapis.com/auth/drive.file'],
    });

    const drive = google.drive({ version: 'v3', auth });

    // Convert Buffer to a Readable Stream
    const stream = new Readable();
    stream.push(fileBuffer);
    stream.push(null);

    const fileMetadata = {
      name: fileName,
      parents: [folderId],
    };

    const media = {
      mimeType: mimeType,
      body: stream,
    };

    const response = await drive.files.create({
      requestBody: fileMetadata,
      media: media,
      fields: 'id',
    });

    const fileId = response.data.id;
    
    // Set permissions so anyone with the link can view it
    await drive.permissions.create({
      fileId: fileId!,
      requestBody: {
        role: 'reader',
        type: 'anyone',
      },
    });

    // We return the direct view link.
    // Note: Google Drive direct linking (uc?export=view) works for most images.
    return `https://drive.google.com/uc?export=view&id=${fileId}`;
  } catch (error) {
    console.error('Error uploading to Google Drive:', error);
    throw error;
  }
}
