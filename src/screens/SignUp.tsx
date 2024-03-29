import { useState } from "react";
import { Alert, Platform, ScrollView } from "react-native";
import { Text, Image, VStack, Center, Heading, TextArea, useToast } from "native-base";
import { useNavigation } from "@react-navigation/native";
import { useForm, Controller } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'


import { api } from "../services/http.service";

import LogoSvg from '@assets/logo.svg'
import BackgroundImage from '@assets/background.png'

import { Input } from "@components/Input";
import { Button } from "@components/Button";

import { AppError } from "@utils/AppError";

import { useAuth } from "@hooks/useAuth";

interface FormDataProps {
    name: string,
    email: string,
    password: string,
    confirmPassword: string
}

const signUpSchema = yup.object({
    name: yup.string().required('Informe o nome'),
    email: yup.string().required('Informe o e-mail').email('E-mail não valido'),
    password: yup.string().required('Informe a senha').min(6, 'A senha deve ter pelo menos 6 dígitos'),
    confirmPassword: yup.string().required('Confirme a senha').oneOf([yup.ref('password')], "A confirmação de senha não confere")
})

export function SignUp() {
    const [isLoading, setIsLoading] = useState(false)
    const toast = useToast()
    const { singIn } = useAuth()
    const navigation = useNavigation()

    const { control, handleSubmit, formState: { errors } } = useForm<FormDataProps>({
        resolver: yupResolver(signUpSchema)
    })

    function handleGoBack() {
        navigation.goBack()
    }

    async function handleSignUp({ name, email, password, confirmPassword }: FormDataProps) {

        try {
            setIsLoading(true)
            await api.post('/users', { name, email, password })
            await singIn(email, password)

        } catch (error) {
            setIsLoading(false)
            const isAppError = error instanceof AppError
            const title = isAppError ? error.message : 'Não foi possível criar a conta. Tente novamente mais tarde.'

            toast.show({
                title,
                placement: 'top',
                bgColor: 'red.500'
            })
        }


        // const request = await fetch('/users', {
        //     method: 'POST',
        //     headers: {
        //         'Accept': 'Application/json',
        //         'Content-type': 'Application/json'
        //     },
        //     body: JSON.stringify({ name, email, password })
        // })
        // const data = await request.json()
    }

    return (
        <ScrollView contentContainerStyle={{ flexGrow: 1 }} showsVerticalScrollIndicator={false}>
            <VStack flex={1} px={10} pb={16}>
                <Image
                    defaultSource={BackgroundImage}
                    source={BackgroundImage}
                    alt="Pessoas treinando"
                    resizeMode="contain"
                    position="absolute"
                />

                <Center my={24}>
                    <LogoSvg />

                    <Text color="gray.100" fontSize="sm">
                        Treine sua mente e o seu corpo.
                    </Text>
                </Center>

                <Center>
                    <Heading color="gray.100" fontSize="xl" mb={6} fontFamily="heading">
                        Crie sua conta
                    </Heading>

                    <Controller
                        control={control}
                        name="name"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                value={value}
                                placeholder="Nome"
                                onChangeText={onChange}
                                errorMessage={errors.name?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="email"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="E-mail"
                                keyboardType="email-address"
                                autoCapitalize="none"
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.email?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Senha"
                                secureTextEntry
                                value={value}
                                onChangeText={onChange}
                                errorMessage={errors.password?.message}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="confirmPassword"
                        rules={{ required: 'Informe a confirmação de senha.' }}
                        render={({ field: { onChange, value } }) => (
                            <Input
                                placeholder="Confirme a sua senha"
                                secureTextEntry
                                value={value}
                                onChangeText={onChange}
                                onSubmitEditing={handleSubmit(handleSignUp)}
                                returnKeyType="send"
                                errorMessage={errors.confirmPassword?.message}
                            />
                        )}
                    />

                    <Button
                        isLoading={isLoading}
                        title="Criar e acessar"
                        onPress={handleSubmit(handleSignUp)}
                    />
                </Center>

                <Button
                    title="Voltar para o login"
                    variant="outline"
                    mt={24}
                    onPress={handleGoBack}
                />
            </VStack>
        </ScrollView>
    )
}