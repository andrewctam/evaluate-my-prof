export interface Comment {
    poster: string; //objectId
    posterName: string;
    text: string
}

export interface Review {
    id: number;
    author: string; //objectId
    authorName: string;
    course: string;
    rating: number;
    difficulty: number;
    amountLearned: number;
    lectureQuality: number;
    hrsPerWeek: number;
    created: Date;
    text: string;
    votes: number;
    comments: Comment[];
}

