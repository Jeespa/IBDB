export interface User {
    documentID: string; // User UID from Firebase Authentication
    admin: boolean;
    email: string;
    image: string;
    username: string;
    read: Array<string>;
}
