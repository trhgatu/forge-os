import { Injectable, Logger } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class UploadService {
  private readonly logger = new Logger('UploadService');

  async uploadFile(file: any): Promise<string> {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_KEY;
    const supabaseBucket = process.env.SUPABASE_BUCKET || 'memories';

    const fileExt = path.extname(file.originalname);
    const filename = `${uuidv4()}${fileExt}`;

    if (supabaseUrl && supabaseKey) {
      this.logger.log(`[UPLOAD] Uploading to Supabase Storage: ${filename}`);
      try {
        const uploadUrl = `${supabaseUrl}/storage/v1/object/${supabaseBucket}/${filename}`;

        const response = await fetch(uploadUrl, {
          method: 'POST',
          headers: {
            Authorization: `Bearer ${supabaseKey}`,
            'Content-Type': file.mimetype,
          },
          body: file.buffer,
        });

        if (!response.ok) {
          const errText = await response.text();
          throw new Error(`Supabase upload failed: ${response.statusText} - ${errText}`);
        }

        const publicUrl = `${supabaseUrl}/storage/v1/object/public/${supabaseBucket}/${filename}`;
        this.logger.log(`[UPLOAD] Uploaded successfully: ${publicUrl}`);
        return publicUrl;
      } catch (err: any) {
        this.logger.error(`Supabase upload error: ${err.message}. Falling back to local upload.`);
      }
    }

    this.logger.log(`[UPLOAD] Saving file locally: ${filename}`);
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const filePath = path.join(uploadDir, filename);
    fs.writeFileSync(filePath, file.buffer);

    const localUrl = `http://localhost:3005/uploads/${filename}`;
    this.logger.log(`[UPLOAD] Local file saved: ${localUrl}`);
    return localUrl;
  }
}
