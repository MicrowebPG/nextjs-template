import { toNextJsHandler } from 'better-auth/next-js';
import { auth } from '@/features/auth/lib/auth';

export const { POST, GET } = toNextJsHandler(auth);
