"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import * as z from "zod"

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
import { useServerAction } from "@/hooks/useServerAction"

export function SignInForm() {
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const { formError, isLoading, executeAction } = useServerAction({
        setError: form.setError,
        onSuccess: (message) => {
            // Optional: Add custom success logic here
            // Example: redirect logic can be added
        },
        // Optional: Add redirect URL if needed
        // redirectTo: "/dashboard"
    })

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        await executeAction(signIn, data)
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
                                />
                            )}
                        />
                    </FieldGroup>
                    <FormError formError={formError} />
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button type="submit" form="signin" fullWidth disabled={isLoading}>
                        {isLoading ? "Signing In..." : "Log In"}
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}
