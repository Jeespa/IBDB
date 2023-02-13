import { Timestamp } from 'firebase/firestore';

export interface Author {
    documentID: string;
    name: string;
    birth: Timestamp;
    image: string;
    nationality: string;
}
