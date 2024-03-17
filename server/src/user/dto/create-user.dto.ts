export class CreateUserDto {
    constructor(
        public uid: string,
        public email: string,
        public password: string,
        public name: string,
        public avatar: string,
        public phone: string,
        public adress: string,
        public role: string,
    ) {}
}
