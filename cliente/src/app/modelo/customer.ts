import { Rol } from './rol';
import { Login } from './login';
export class Customer {
id: number;
name: string;
address: string;
email: string;
phone: string;
login: Login;
rol: Rol;
}
