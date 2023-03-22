import { Timestamp } from 'firebase/firestore';

export interface Review {
    documentID?: string; // Auto
    user: string;
    username: string;
    book: string;
    rating: string;
    text: string;
    published?: string;
}