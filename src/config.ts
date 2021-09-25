const DOMAIN = `http://${process.env.HOST?.trim() || '127.0.0.1'}:${Number(process.env.PORT?.trim()) || 3000}`;
export const config = {
  HOST: process.env.HOST?.trim() || '127.0.0.1',
  PORT: Number(process.env.PORT?.trim()) || 3000,
  BARK: process.env.BARK_SERVER?.toString() || 'https://api.day.app',
  DOMAIN: process.env.DOMAIN?.trim() || DOMAIN,
}