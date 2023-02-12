import { Input as NativeBasisInput, IInputProps, FormControl } from 'native-base'

interface InputProps extends IInputProps {
    errorMessage?: string | null
}

export function Input({ errorMessage = null, isInvalid, ...rest }: InputProps) {
    const invalid = !!errorMessage || isInvalid
    return (
        <FormControl isInvalid={invalid} mb={4}>
            <NativeBasisInput
                bg="gray.700"
                h={14}
                px={4}
                borderWidth={0}
                fontSize="md"
                color="white"
                fontFamily="body"
                isInvalid={invalid}
                _invalid={{
                    borderWidth:1,
                    borderColor: "red.500"
                }}
                placeholderTextColor="gray.300"
                _focus={{
                    bgColor: 'gray.700',
                    borderWidth: 1,
                    borderColor: 'green.500'
                }}
                {...rest}
            />
            <FormControl.ErrorMessage _text={{color:"red.500"}}>
                {errorMessage}
            </FormControl.ErrorMessage>
        </FormControl>
    );

}