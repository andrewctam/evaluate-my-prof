import { User } from "./user-types";

export interface Comment {
    poster: User;
    text: string
}

export interface Review {
    id: number;
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

export enum ReviewActionType {
    ADD_REVIEW = "ADD_REVIEW",
    ADD_COMMENT = "ADD_COMMENT",
    VOTE = "VOTE",
}
export type ReviewAction =
    { type: ReviewActionType.ADD_REVIEW, payload: Review } |
    { type: ReviewActionType.ADD_COMMENT, payload: { id: number, comment: Comment } } |
    { type: ReviewActionType.VOTE, payload: { id: number, change: number } };
    
export interface ReviewState {
    reviews: Review[];
}
export const initialReviewState: ReviewState = {  
    reviews: [],
};