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
