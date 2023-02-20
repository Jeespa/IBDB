import { Timestamp } from 'firebase/firestore';

export interface Reviews {
    documentID: string;
    user: string;
    book: string;
    rating: number;
    text: string;
    published: Timestamp;
}
