import { DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useTheme } from "native-base";


import { AuthRoutes } from "./auth.routes";
import { AppRoutes } from "./app.routes";

export function Routes() {
    const { colors } = useTheme()

    const theme = DefaultTheme
    theme.colors.background = colors.gray[700]

    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: colors.gray[700] }}>
            <NavigationContainer >
                <AuthRoutes />
            </NavigationContainer>
        </SafeAreaView>
    )
}