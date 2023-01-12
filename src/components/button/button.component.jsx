import { BaseButton, InvertedButton, GoogleButton } from "./button.styles";

export const BUTTON_TYPE_CLASSES = {
    base: 'base',
    google: 'google-sign-in',
    inverted: 'inverted'    
}

const getButton = (type = 'base') => (
    {
        [BUTTON_TYPE_CLASSES.base]: BaseButton,
        [BUTTON_TYPE_CLASSES.google]: GoogleButton,
        [BUTTON_TYPE_CLASSES.inverted]: InvertedButton
    }[type]
);

const Button = ({ children, buttonType, ...otherProps }) => {
    const CustomButton = getButton(buttonType);

    return (
        <CustomButton 
            className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`} 
            {...otherProps}>
            {children}
        </CustomButton>
    )
};

export default Button;