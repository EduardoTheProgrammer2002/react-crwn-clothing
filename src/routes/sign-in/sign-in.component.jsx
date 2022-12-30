import { signInWithGooglePopup, createUserDoc } from "../../utils/firebase/firebase.utils";
import "./sign-in.styles.scss";


const SignIn = () => {
    const logGoogleUser = async () => {
        const response = await signInWithGooglePopup();
        const userDocRef = await createUserDoc(response.user);
        console.log(response);
    }

    return (
        <div>
            <h1>Sign in page</h1>
            <button onClick={logGoogleUser}>Google Signin</button>
        </div>
    )
};

export default SignIn;