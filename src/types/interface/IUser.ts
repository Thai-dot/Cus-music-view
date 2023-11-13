export interface ISecureUser {
  createAt: string;
  email: string;
  firstname: string;
  id: number;
  isVerify: boolean;
  lastName: string;
  role: string;
  updateAt: string;
}

interface IUser extends ISecureUser {
  twoFASecret: string;
}

export default IUser;
