import { S3Storage } from 'coze-coding-dev-sdk';

export const storage = new S3Storage({
  endpointUrl: process.env.COZE_BUCKET_ENDPOINT_URL,
  accessKey: '',
  secretKey: '',
  bucketName: process.env.COZE_BUCKET_NAME,
  region: 'cn-beijing',
});

export async function getImageUrl(key: string): Promise<string> {
  return storage.generatePresignedUrl({ key, expireTime: 86400 });
}
