interface IUser {
  createAt: string;
  email: string;
  firstname: string;
  id: number;
  isVerify: boolean;
  lastName: string;
  role: string;
  twoFASecret: string;
  updateAt: string;
}

export default IUser;
