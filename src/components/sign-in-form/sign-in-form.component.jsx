import { useState } from "react";
import { signInWithGooglePopup, signUserInWithEmailAngPassword } from "../../utils/firebase/firebase.utils";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";

//styles components
import {
    SignInContainer,
    BtnContainer
} from "./sign-in-form.styles";
import { useDispatch } from "react-redux";
import { USER_ACTION_TYPES } from "../../redux/user/user.types";
import { emailSignInStart, googleSignInStart } from "../../redux/user/user.action";




const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const dispatch = useDispatch();
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const onChangeHandler = (event) => {
        const { name, value } = event.target;
        setFormFields({ ...formFields, [name]: value })
    }

    const signUserInWithGooglePopup = () => {
        dispatch(googleSignInStart(USER_ACTION_TYPES.GOOGLE_SIGN_IN_START));
    }



    const onSubmitHandler = async (event) => {
        event.preventDefault();

        try {
            dispatch(emailSignInStart(email, password))
            alert("Sucess! You're logged in");

            // reseting a the form's fields
            resetFormFields();
        } catch (error) {
            console.log(error.code);
        }
    }

    return (
        <SignInContainer>
            <h2>Do you have an account?</h2>
            <h4>Sign in with your email and password</h4>
            <form onSubmit={onSubmitHandler}>
                <FormInput
                    label="Email"
                    onChange={onChangeHandler}
                    type='email'
                    name='email'
                    required
                    value={email}
                />

                <FormInput
                    label="Password"
                    onChange={onChangeHandler}
                    type='password'
                    name='password'
                    required
                    value={password}
                />
                <BtnContainer>
                    <Button type="submit"> Sign in </Button>
                    <Button type="button" onClick={signUserInWithGooglePopup} buttonType={BUTTON_TYPE_CLASSES.google}>Google sign in</Button>
                </BtnContainer>
            </form>
        </SignInContainer>
    )
}

export default SignInForm;