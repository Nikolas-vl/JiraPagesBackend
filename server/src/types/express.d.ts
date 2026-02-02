export declare global {
  namespace Express {
    interface Request {
      userId?: number;
      role?: 'USER' | 'ADMIN';
      log?: any;
    }
  }
}