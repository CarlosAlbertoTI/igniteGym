import { useFocusEffect } from "@react-navigation/native";
import { useCallback, useState } from "react";
import { Heading, SectionList, Text, VStack, useToast } from "native-base";

import { api } from "@services/http.service";

import { ScreenHeader } from "@components/ScreenHeader";
import { HistoryCard } from "@components/HistoryCard";
import { Loading } from "@components/Loading";

import { AppError } from "@utils/AppError";

import { HistoryByDayDTO } from "@dtos/HistoryByDayDTO";

export function History() {
  const toast = useToast();
  const [isLoading, setIsLoading] = useState(true);
  const [exercises, setExercises] = useState<HistoryByDayDTO[]>([]);

  async function fetchHistory() {
    try {
      setIsLoading(true);
      const response = await api.get("/history");
      setExercises(response.data);
    } catch (error) {
      const isAppError = error instanceof AppError;
      const title = isAppError
        ? error.message
        : "Não foi possível carregar o histórico.";
      toast.show({
        title: title,
        placement: "top",
        bgColor: "red.500",
      });
    } finally {
      setIsLoading(false);
    }
  }

  useFocusEffect(
    useCallback(() => {
      fetchHistory();
    }, [])
  );

  return (
    <VStack flex={1}>
      <ScreenHeader title="Histórico de exercícios" />
      {isLoading ? (
        <Loading />
      ) : (
        <SectionList
          stickySectionHeadersEnabled={false}
          sections={exercises}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <HistoryCard data={item} />}
          renderSectionHeader={({ section }) => (
            <Heading
              color={"gray.200"}
              fontSize="md"
              mt="10"
              mb="3"
              fontFamily="heading"
            >
              {section.title}
            </Heading>
          )}
          contentContainerStyle={
            exercises.length === 0 && { flex: 1, justifyContent: "center" }
          }
          ListEmptyComponent={() => (
            <Text color={"gray.100"} textAlign="center">
              Não há exercícios registrados ainda. {"\n"}
              Vamos fazer exercícios hoje?
            </Text>
          )}
          px="8"
          showsVerticalScrollIndicator={false}
        />
      )}
      {/* <HistoryCard /> */}
      {/* <HistoryCard /> */}
    </VStack>
  );
}
