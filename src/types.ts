export interface User {
    name: string;
}

export enum UserActionType {
    SWITCH = "SWITCH",
    ADD = "ADD",
}

export interface UserAction {
    type: UserActionType;
    payload: User;
}

export interface UserState {
    users: User[];
    currentUser: User | null;
}


export const initialState: UserState = {
    users: [],
    currentUser: null,
  };

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
