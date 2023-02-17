import { Timestamp } from 'firebase/firestore';

export interface Book {
    documentID: string; // ISBN
    author?: string;
    title: string;
    description?: string;
    genre?: Array<string>;
    image?: string;
    pages?: number;
    published?: Timestamp;
}
