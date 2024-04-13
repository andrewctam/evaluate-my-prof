import { useContext } from "react"
import "./Login.scss"
import { DispatchContext, UserContext } from "../../App"
import { UserActionType } from "../../types";

export default function Login() {
    const userState = useContext(UserContext);
    const dispatch = useContext(DispatchContext);

    return (
        <div className = "login">
            {userState.currentUser ? userState.currentUser.name : "No user logged in"}

            <button
                onClick = {() => {
                    dispatch({
                        type: UserActionType.SWITCH,
                        payload: {
                            name: "User 1"
                        }
                    })
                }}
            >
                Switch
            </button>
        </div>
    )
}