const DOMAIN = `http://${process.env.HOST?.trim() || '127.0.0.1'}:${Number(process.env.PORT?.trim()) || 3000}`;
if (process.env.NODE_ENV !== 'development' && !process.env.MONGODB) {
  console.log('Please set MONGODB environment');
  process.exit();
}
export const config = {
  MONGODB: process.env.MONGODB?.trim() || 'mongodb://127.0.0.1/bark_subs',
  HOST: process.env.HOST?.trim() || '127.0.0.1',
  PORT: Number(process.env.PORT?.trim()) || 3000,
  BARK: process.env.BARK_SERVER?.toString() || 'https://api.day.app',
  DOMAIN: process.env.DOMAIN?.trim() || DOMAIN,
}