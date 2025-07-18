// client/src/types/email/email.types.ts
export interface SendAccessLinkBody {
  email: string;
  accessUrl: string;
}

export interface SendResetTokenBody {
  email: string;
  token: string;
}