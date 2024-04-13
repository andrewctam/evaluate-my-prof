export interface User {
    name: string;
}

export interface Comment {
    poster: User;
    text: string
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
    votes: number;
    comments: Comment[];
}
