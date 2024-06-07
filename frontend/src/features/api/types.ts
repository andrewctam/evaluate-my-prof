
export interface LoginRegisterPayload {
    username: string;
    password: string;
    email?: string | undefined;
}
export type LoginRegisterResponse = {
    username: string;
    sessionToken: string;
};

export interface AddReviewPayload {
    authorUsername: string,
    sessionToken: string,
    text: string,
    course: string,
    rating: string,
    difficulty: string,
    amountLearned: string,
    lectureQuality: string,
    hrsPerWeek: string
}

export interface DeleteReviewPayload {
    authorUsername: string,
    sessionToken: string,
    reviewId: string
}
// these 2 share the same fields as DeleteReviewPayload to identify a review
export interface CommentPayload extends DeleteReviewPayload {
    text: string
}
export interface VotePayload extends DeleteReviewPayload {
    vote: number
}

