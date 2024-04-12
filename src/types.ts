export interface User {
    name: string;
}

export interface Review {
    id: string;
    author: User;
    rating: number;
    difficulty: number;
    amountLearned: number;
    lectureQuality: number;
    hrsPerWeek: number;
    text: string;
}
