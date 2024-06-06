import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface UserState {
    username: string,
    sessionToken: string | null
}

const initialState: UserState = {
    username: localStorage.getItem("username") || "",
    sessionToken: localStorage.getItem("sessionToken")
}

type LoginPayload = {
    username: string;
    sessionToken: string;
};

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        logout: () => {
            localStorage.removeItem("username");
            localStorage.removeItem("sessionToken");
            return { username: "" , sessionToken: null };
        },
        login: (_state, action: PayloadAction<LoginPayload>) => {
            const { username, sessionToken } = action.payload;

            localStorage.setItem("username", username);
            localStorage.setItem("sessionToken", sessionToken);
            
            return { username, sessionToken };
        }
    }
});

export const { logout, login } = userSlice.actions;
export default userSlice.reducer;

