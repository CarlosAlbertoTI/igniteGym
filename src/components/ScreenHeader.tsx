import { Center, Heading } from "native-base";
import { Platform } from "react-native";

interface ScreenHeaderProps {
    title: string
}

export function ScreenHeader({ title }: ScreenHeaderProps) {
    return (
        <Center bg="gray.600" pb={6} pt={Platform.OS === 'android' ? 16 : 8}>
            <Heading color="gray.100" fontSize="xl" fontFamily="heading">
                {title}
            </Heading>
        </Center>
    )
}