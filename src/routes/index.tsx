
import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "native-base";

import { useAuth } from '@hooks/useAuth'

import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

import { Loading } from "@components/Loading";

export function Routes() {
    const { colors } = useTheme()
    const { user, isLoadingUserStorageData } = useAuth()

    const theme = DefaultTheme
    theme.colors.background = colors.gray[700]

    if (isLoadingUserStorageData) {
        return (
            <Loading></Loading>
        )
    }

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray[700] }}>
            <NavigationContainer >
                {user.id ? <AppRoutes /> : <AuthRoutes />}
            </NavigationContainer>
        </SafeAreaView>
    )
}