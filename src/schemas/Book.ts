import { Timestamp } from 'firebase/firestore';

export interface Book {
    documentID: string; // ISBN
    author?: string; // TODO: We need to change this so that a book can have several authors
    title: string;
    description?: string;
    genre?: Array<string>;
    image?: string;
    pages?: number;
    published?: Timestamp;
}
