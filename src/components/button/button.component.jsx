import { BaseButton, InvertedButton, GoogleButton, ButtonSpinner } from "./button.styles";

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

const Button = ({ children, buttonType, isLoading = false, ...otherProps }) => {
    const CustomButton = getButton(buttonType);

    return (
        <CustomButton
            disabled={isLoading}
            className={`button-container ${BUTTON_TYPE_CLASSES[buttonType]}`}
            {...otherProps}>
            {isLoading ? <ButtonSpinner /> : children}
        </CustomButton>
    )
};

export default Button;