export interface User {
    documentID: string; // User UID from Firebase Authentication
    admin: boolean;
    email: string;
    username: string;
    readBooks?: Array<string>;
}
