import { useCallback, useEffect, useState } from "react";
import { Platform } from "react-native";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { Text, FlatList, Heading, HStack, VStack, useToast } from "native-base";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";

import { api } from '@services/http.service'

import { AppError } from "@utils/AppError";
import { ExerciseDTO } from "@dtos/ExerciseDTO";
import { Loading } from "@components/Loading";

export function Home() {
    const [group, setGroup] = useState<string[]>([])
    const [exercises, setExercises] = useState<ExerciseDTO[]>([])
    const [groupSelected, setGroupSelected] = useState('antebraço')
    const [isLoading, setIsLoading] = useState(true)

    const toast = useToast()
    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleOpenExerciseDetails(exerciseId: string) {
        navigation.navigate('exercise', { exerciseId })
    }

    async function fetchGroups() {
        try {
            const response = await api.get('/groups')
            setGroup(response.data)
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar os grupos musculares.'
            toast.show({
                title: title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }
    }

    async function fetchExerciseByGroup() {
        setIsLoading(true)
        try {
            const response = await api.get(`/exercises/bygroup/${groupSelected}`)
            setExercises(response.data)
        } catch (error) {
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível carregar os exercícios.'
            toast.show({
                title: title,
                placement: 'top',
                bgColor: 'red.500'
            })
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchGroups()
    }, [])

    useFocusEffect(useCallback(() => {
        fetchExerciseByGroup()
    }, [groupSelected]))

    return (
        <VStack flex={1}
        >
            <HomeHeader />
            <FlatList
                data={group}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <Group
                        name={item}
                        isActive={String(groupSelected).toLocaleUpperCase() === String(item).toLocaleUpperCase()}
                        onPress={() => setGroupSelected(item)}
                    />

                )}
                horizontal
                showsHorizontalScrollIndicator={false}
                _contentContainerStyle={{
                    px: 8
                }}
                my={10}
                maxH={10}
                minH={10}

            />
            {isLoading ? <Loading /> :
                <VStack flex={1} px={8}>
                    <HStack justifyContent="space-between" mb={5}>
                        <Heading color="gray.200" fontSize="md" fontFamily="heading">
                            Exercícios
                        </Heading>
                        <Text color="gray.200" fontSize="md">
                            {exercises.length}
                        </Text>
                    </HStack>


                    <FlatList
                        data={exercises}
                        keyExtractor={(item) => item.id}
                        renderItem={({ item }) => (
                            <ExerciseCard
                                data={item}
                                onPress={() => handleOpenExerciseDetails(item.id)}
                            />
                        )}
                        showsVerticalScrollIndicator={false}
                        _contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 20 : 80 }}
                    />
                    {/* <ExerciseCard /> */}
                </VStack>
            }
        </VStack>
    )
}