export enum UserActionType {
    LOGIN = "LOGIN",
    LOGOUT = "LOGOUT",
}
type LoginPayload = {
    username: string;
    sessionToken: string;
};
export type UserAction =
    { type: UserActionType.LOGIN, payload: LoginPayload } |
    { type: UserActionType.LOGOUT, payload: {}};

export interface UserState {
    username: string,
    sessionToken: string | null
}
