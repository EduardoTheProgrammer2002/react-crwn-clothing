import { useState } from "react";
import { createAuthUserWithEmailAndPassword, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import Button from "../button/button.component";
import FormInput from "../form-input/form-input.component";

import "./sign-up-form.styles.scss";

const defaultFormFields = {
    displayName: '',
    email: '',
    password: '',
    confirmPassword: ''
};

const SignUpForm = () => {
    const [formFields, setFormFields] = useState(defaultFormFields);
    const {displayName, email, password, confirmPassword} = formFields;

    const resetFormFields = () => {
        setFormFields(defaultFormFields);
    }

    const onSubmitHandler = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            console.log('Password not matching each other');
            return 
        };

        try {
            const {user} = await createAuthUserWithEmailAndPassword(email, password);
            const UserDocRef = await createUserDocumentFromAuth(user, {displayName});
            resetFormFields(); 
            
        } catch (error) {
            if (error.code === "auth/email-already-in-use") {
                alert('Email already in used')
            } else {
                console.log('User creation error', error)
            }
        }
    }
    
    const onChangeHandler = (event) => {
        const {name, value} = event.target;
        setFormFields({...formFields, [name]: value})
    }
    
    return (
        <div className="sign-up-container">
            <h2>Don't you have an account?</h2>
            <h4>Sign up with your email and password</h4>
            <form onSubmit={onSubmitHandler}>
                <FormInput
                    label="Display Name"
                    type="text" 
                    required 
                    onChange={onChangeHandler} 
                    name="displayName"
                    value={displayName}/>
                <FormInput 
                    label="Email"
                    type="email" 
                    required 
                    name="email" 
                    onChange={onChangeHandler} 
                    value={email}/>
                <FormInput
                    label="Password" 
                    type="password" 
                    required 
                    name="password"  
                    onChange={onChangeHandler} 
                    value={password}/>
                <FormInput
                    label="Confirm Password" 
                    type="password" 
                    required 
                    name="confirmPassword" 
                    onChange={onChangeHandler} 
                    value={confirmPassword}/>
                <Button type="submit"> Sign up </Button>
            </form>
        </div>
    )
};

export default SignUpForm;