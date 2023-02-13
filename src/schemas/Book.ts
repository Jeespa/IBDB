import { Timestamp } from 'firebase/firestore';

export interface Book {
    author: string;
    title: string;
    description: string;
    genre: Array<string>;
    image: string;
    pages: number;
    published: Timestamp;
}