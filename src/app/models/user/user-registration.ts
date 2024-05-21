export class UserRegistration {
    id: string;
    name: string;
    lastName: string;
    email: string;
    phoneNumber: string | null;
    password?: string;

    constructor(data: any) {
        this.id = data.id;
        this.name = data.name;
        this.lastName = data.lastName;
        this.email = data.email;
        this.phoneNumber = data.phoneNumber || null;
        this.password = data.password;
    }
}
