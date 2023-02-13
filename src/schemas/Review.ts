import { Timestamp } from 'firebase/firestore';

export interface Reviews {
    user: string;
    book: string;
    rating: number;
    text: string;
    published: Timestamp;
}