import { useState } from "react";
import { Platform } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Box, Text, FlatList, Heading, HStack, TextArea, VStack } from "native-base";

import { AppNavigatorRoutesProps } from "@routes/app.routes";

import { ExerciseCard } from "@components/ExerciseCard";
import { Group } from "@components/Group";
import { HomeHeader } from "@components/HomeHeader";

export function Home() {
    const [group, setGroup] = useState(['costas', 'ombro', 'peito', 'biceps', 'triceps', 'perna'])
    const [exercises, setExercises] = useState(['Remada alta', 'Remada alternada', 'Supino reto', 'Supino Inclinado'])
    const [groupSelected, setGroupSelected] = useState('costas')

    const navigation = useNavigation<AppNavigatorRoutesProps>()

    function handleOpenExerciseDetails() {
        navigation.navigate('exercise')
    }

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
                    keyExtractor={(item) => item}
                    renderItem={({ item }) => (
                        <ExerciseCard 
                            onPress={handleOpenExerciseDetails}
                        />
                    )}
                    showsVerticalScrollIndicator={false}
                    _contentContainerStyle={{ paddingBottom: Platform.OS === 'ios' ? 20 : 80 }}
                />
                {/* <ExerciseCard /> */}
            </VStack>

        </VStack>
    )
}