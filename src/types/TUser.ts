
export interface TUser {
    name: string;
    email: string;
    password: string;
    isAdmin: boolean;
    avatar?: string;
    address?: {
        street: string;
        city: string;
        state: string;
        postalCode: string;
        country: string;
        latitude: number;
        longitude: number;
    };
    resetPasswordToken?: string;
    resetPasswordExpires?: Date;
}