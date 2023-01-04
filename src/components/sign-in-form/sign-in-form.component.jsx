import { useState } from "react";
import { createUserDocumentFromAuth, signInWithGooglePopup, signUserInWithEmailAngPassword } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.styles.scss";

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
            const {user} = await signInWithGooglePopup();
            await createUserDocumentFromAuth(user);
        } catch (error) {
            console.log(error.code);
        }
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();
        
        try {
            const {user} = await signUserInWithEmailAngPassword(email, password);
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
        <div className="sign-in-container">
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
                <div className="btn-container">
                    <Button type="submit"> Sign in </Button>
                    <Button type="button" onClick={signUserInWithGooglePopup} buttonType={'google'}>Google sign in</Button>
                </div>
            </form>
        </div>
    )
}

export default SignInForm;