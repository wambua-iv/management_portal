const devEnv = process.env.NODE_ENV !== 'production';

export const server = devEnv ? 'http://localhost:3000' : 'https://mysite.com';
export const ext_server = devEnv ? 'http://localhost:8082' : 'https://mysite.com'