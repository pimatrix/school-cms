import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { getServerClient } from '@/lib/supabase/server';

export const runtime = 'nodejs';

// Media upload for the admin panel (images AND videos).
// SECURITY: only a logged-in admin (Supabase Auth session) can upload.
// Cloudinary secret keys never leave the server.
export async function POST(request: Request) {
  try {
    const supabase = getServerClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) {
      return NextResponse.json(
        { error: 'Login required. Only an administrator can upload media.' },
        { status: 401 }
      );
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;
    if (!cloudName || !apiKey || !apiSecret) {
      return NextResponse.json(
        { error: 'Cloudinary is not configured. Check the environment variables in the deployment settings.' },
        { status: 503 }
      );
    }

    const formData = await request.formData();
    const file = formData.get('file');
    if (!file || typeof file === 'string') {
      return NextResponse.json({ error: 'No file was received.' }, { status: 400 });
    }

    const isVideo = file.type.startsWith('video/');
    const isImage = file.type.startsWith('image/');
    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: 'Only image and video files can be uploaded.' },
        { status: 400 }
      );
    }
    const maxBytes = isVideo ? 100 * 1024 * 1024 : 10 * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        {
          error: isVideo
            ? 'Please keep the video under 100 MB.'
            : 'Please keep the image under 10 MB.',
        },
        { status: 400 }
      );
    }

    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });

    const buffer = Buffer.from(await file.arrayBuffer());
    const result = await new Promise<{
      secure_url: string;
      public_id: string;
      resource_type: string;
    }>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          folder: 'school-cms',
          resource_type: isVideo ? 'video' : 'image',
        },
        (error, res) => {
          if (error || !res)
            reject(error || new Error('Upload failed'));
          else
            resolve(
              res as {
                secure_url: string;
                public_id: string;
                resource_type: string;
              }
            );
        }
      );
      stream.end(buffer);
    });

    return NextResponse.json({
      url: result.secure_url,
      publicId: result.public_id,
      resourceType: result.resource_type,
      mediaType: isVideo ? 'video' : 'image',
    });
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json(
      { error: 'Upload failed. Please try again.' },
      { status: 500 }
    );
  }
}
