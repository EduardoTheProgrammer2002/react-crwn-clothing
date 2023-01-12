import { useState } from "react";
import { signInWithGooglePopup, signUserInWithEmailAngPassword } from "../../utils/firebase/firebase.utils";
import Button, { BUTTON_TYPE_CLASSES } from "../button/button.component";
import FormInput from "../form-input/form-input.component";

//styles components
import { 
    SignInContainer,
    BtnContainer
} from "./sign-in-form.styles";




const defaultFormFields = {
    email: '',
    password: ''
}

const SignInForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const { email, password } = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const onChangeHandler = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }

    const signUserInWithGooglePopup = async () => {
        try {
            await signInWithGooglePopup();
        } catch (error) {
            console.log(error.code);
        }
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        try {
            await signUserInWithEmailAngPassword(email, password);
            alert("Sucess! You're logged in");

            // reseting a the form's fields
            resetFormFields();
        } catch (error) {
            switch (error.code) {
                case "auth/user-not-found":
                    alert("No user with that email, please create an account...")
                    break;
                case "auth/wrong-password":
                    alert("Incorrect password, try again!")
                    break;
                default:
                    console.log(error);
            }
            
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