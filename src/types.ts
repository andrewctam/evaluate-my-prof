export interface User {
    name: string;
}

export interface Review {
    author: User;
    course: string;
    rating: number;
    difficulty: number;
    amountLearned: number;
    lectureQuality: number;
    hrsPerWeek: number;
    text: string;
}
