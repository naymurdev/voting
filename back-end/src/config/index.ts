import dotenv from 'dotenv';
import { cleanEnv, num, str } from 'envalid';
import * as path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export const env = cleanEnv(process.env, {
  PORT: num({ default: 8081 }),
  MONGODB_URI: str(),
  JWT_SECRET: str(),
});
