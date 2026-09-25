export const AUTH_TOKEN_EXPIRY = 60 * 60 * 24 * 7; // 7 days
export const AUTH_SESSION_UPDATE_AGE = 60 * 60 * 24; // 1 day

export const ROLES = ['USER', 'ADMIN', 'DEVELOPER'] as const;
export type Role = (typeof ROLES)[number];

export const ADMIN_ROLES = ['ADMIN', 'DEVELOPER'] as const satisfies readonly Role[];
export const DEFAULT_ROLE = 'USER' as const satisfies Role;
