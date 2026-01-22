import { auth } from '@/features/auth/lib/auth';
import { toNextJsHandler } from 'better-auth/next-js';

export const { POST, GET } = toNextJsHandler(auth);
