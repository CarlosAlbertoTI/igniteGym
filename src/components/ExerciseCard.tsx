import { Heading, HStack, Icon, Image, Text, VStack } from "native-base";
import { Entypo } from '@expo/vector-icons'
import { TouchableOpacity, TouchableOpacityProps } from "react-native";

interface ExerciseCardProps extends TouchableOpacityProps { }

export function ExerciseCard({ ...rest }: ExerciseCardProps) {
    return (
        <TouchableOpacity
            {...rest}
        >
            <HStack bg="gray.500" alignItems="center" p={2} pr={4} rounded="md" mb={3}>
                <Image
                    source={{ uri: 'http://conteudo.imguol.com.br/c/entretenimento/0c/2019/12/03/remada-unilateral-com-halteres-1575402100538_v2_600x600.jpg' }}
                    alt="Imagem do exercício"
                    w={16}
                    h={16}
                    rounded="md"
                    mr={4}
                    resizeMode="cover"
                />
                <VStack flex={1}>
                    <Heading fontSize="lg" color="white">
                        Remada Alternada
                    </Heading>
                    <Text fontSize="sm" color="gray.200" mt={1} numberOfLines={2}>
                        2 séries x 12 repetições
                    </Text>
                </VStack>

                <Icon
                    as={Entypo}
                    name="chevron-thin-right"
                    color={"gray.300"}
                />
            </HStack>
        </TouchableOpacity>
    )
}