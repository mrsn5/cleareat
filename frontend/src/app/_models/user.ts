export class User {
  uid: number;
  email: string;
  fullName: string;
  password: string;
  phone: string;
  token?: string;
  role: string;

  isAdmin() {
    return this.role == 'admin'
  }
}
