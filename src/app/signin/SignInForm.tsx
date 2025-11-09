"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"
import { useQueryClient } from '@tanstack/react-query'

import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    Field,
    FieldError,
    FieldGroup,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { FormPasswordInput } from "@/components/form/FormPasswordInput"
import { FormLabel } from "@/components/form/FormLabel"
import { signInSchema } from "@/lib/validation/user-schema"
import { signIn } from "./actions"
import FormError from "@/components/form/FormError"
import { useServerMutation } from "@/hooks/useServerMutation"

export function SignInForm() {
    const queryClient = useQueryClient()

    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const signInMutation = useServerMutation(signIn, {
        setError: form.setError,
        mutationKey: ['signin'],
        invalidateQueries: [
            ['user'],
            ['auth'],
        ],
        onSuccess: (data) => {
            // Update user data in cache immediately
            queryClient.setQueryData(['user'], data)
            form.reset()
        },
        redirectTo: "/",
        showSuccessToast: true,
    })

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        await signInMutation.mutateAsync(data)
    }

    return (
        <Card className="w-full sm:max-w-md">
            <CardHeader>
                <CardTitle className="text-2xl">Admin Log In</CardTitle>
                <CardDescription>
                    Don't have an account?{" "}<a
                        href="#"
                        className="font-medium text-primary hover:underline"
                    >
                        Create an account here.
                    </a>
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form id="signin" onSubmit={form.handleSubmit(onSubmit)}>
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FormLabel htmlFor="email">
                                        Email
                                    </FormLabel>
                                    <Input
                                        {...field}
                                        id="email"
                                        placeholder="Email"
                                        autoComplete="email"
                                        disabled={signInMutation.isLoading}
                                    />
                                    {fieldState.invalid && (
                                        <FieldError errors={[fieldState.error]} />
                                    )}
                                </Field>
                            )}
                        />
                        <Controller
                            name="password"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <FormPasswordInput
                                    {...field}
                                    label="Password"
                                    id="password"
                                    placeholder="Password"
                                    autoComplete="password"
                                    error={fieldState.invalid ? fieldState.error?.message : undefined}
                                    disabled={signInMutation.isLoading}
                                />
                            )}
                        />
                    </FieldGroup>
                    {signInMutation.isError && (
                        <FormError formError={signInMutation.error?.message} />
                    )}
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button
                        type="submit"
                        form="signin"
                        fullWidth
                        disabled={signInMutation.isLoading}
                        loading={signInMutation.isLoading}
                    >
                        {signInMutation.isLoading ? "Signing In..." : "Log In"}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}