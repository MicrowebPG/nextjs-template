'use client';

import { adminClient, inferAdditionalFields } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';
import { auth } from './auth';
import { ac, roles } from './permissions';

export const authClient = createAuthClient({
  plugins: [inferAdditionalFields<typeof auth>(), adminClient({ ac, roles })],
});
