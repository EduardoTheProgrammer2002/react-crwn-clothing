import { FormInputLabel, Input, Group } from './form-input.styles';



const FormInput = ({label, ...otherProps}) => {
    return (
        <Group className="group">
            <Input {...otherProps}/>
            {label &&
                <FormInputLabel shrink={otherProps.value.length}>
                    {label}
                </FormInputLabel>
            }
            
        </Group>
    )
}

export default FormInput;