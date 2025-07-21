// this allows req to use user property
// separating the functions for clarity.

// created the interface first
export interface AuthenticatedUser {
  id: string;
  email: string;
  role: 'admin' | 'user';
}

// exporting the interface here
declare global {
  namespace Express {
    interface Request {
      user?: AuthenticatedUser;  //the interface created
    }
  }
}
export {};