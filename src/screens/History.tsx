import { useState } from "react";
import { Heading, SectionList, Text, VStack } from "native-base";

import { ScreenHeader } from '@components/ScreenHeader'
import { HistoryCard } from "@components/HistoryCard";


export function History() {
    const [exercises, setExercises] = useState([
        {
            title: '11.01.2015',
            data: ['Supino Reto', 'Supino Inclinado']
        },
        {
            title: '11.01.2015',
            data: ['Supino Reto', 'Supino Inclinado']
        }
    ])
    return (
        <VStack flex={1}>
            <ScreenHeader title="Histórico de exercícios" />
            <SectionList
                stickySectionHeadersEnabled={false}
                sections={exercises}
                keyExtractor={(item) => item}
                renderItem={({ item }) => (
                    <HistoryCard />
                )}
                renderSectionHeader={({ section }) => (
                    <Heading color={"gray.200"} fontSize="md" mt="10" mb="3" fontFamily="heading">
                        {section.title}
                    </Heading>
                )}
                contentContainerStyle={exercises.length === 0 && { flex: 1, justifyContent: 'center' }}
                ListEmptyComponent={() => (
                    <Text color={"gray.100"} textAlign="center">
                        Não há exercícios registrados ainda. {'\n'}
                        Vamos fazer exercícios hoje?
                    </Text>
                )}
                px="8"
                showsVerticalScrollIndicator={false}
            />
            {/* <HistoryCard /> */}
            {/* <HistoryCard /> */}
        </VStack>
    )
}