import { Timestamp } from 'firebase/firestore';

export interface Author {
    name: string;
    birth: Timestamp;
    image: string;
    nationality: string;
}