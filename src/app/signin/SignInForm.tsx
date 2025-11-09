"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { Controller, useForm } from "react-hook-form"
import { toast } from "sonner"
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

export function SignInForm() {
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const {
        handleSubmit,
        control,
        formState: { errors, isSubmitting },
        setError,
    } = form

    const [formError, setFormError] = useState<string | null>(null)

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        const res = await signIn(data);

        if (res?.error) {
            if ("form" in res.error && res.error.form) {
                setFormError(res.error.form[0]);
            }

            Object.entries(res.error).forEach(([key, value]) => {
                if (key !== "form") {
                    setError(key as keyof z.infer<typeof signInSchema>, {
                        type: "server",
                        message: value?.[0] ?? "Invalid",
                    });
                }
            });

            return;
        }

        if (res?.success) {
            setFormError(null);
            toast(res.success);

            // if (window) {
            //     const redirectTo = searchParams.get("redirectTo") || "/events"
            //     window.location.href = redirectTo
            // }
        }
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
                </form>
            </CardContent>
            <CardFooter>
                <Field orientation="horizontal">
                    <Button type="submit" form="signin" fullWidth>
                        Log In
                    </Button>
                </Field>
            </CardFooter>
        </Card>
    )
}
