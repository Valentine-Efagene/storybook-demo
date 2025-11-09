"use client"

import * as React from "react"
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

const formSchema = z.object({
    email: z
        .string()
        .min(5, "Email must be at least 5 characters.")
        .max(32, "Email must be at most 32 characters."),
    password: z
        .string()
        .min(8, "Password must be at least 8 characters.")
        .max(100, "Password must be at most 100 characters."),
})

export function SignInForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    function onSubmit(data: z.infer<typeof formSchema>) {
        toast("You submitted the following values:", {
            description: (
                <pre className="bg-code text-code-foreground mt-2 w-[320px] overflow-x-auto rounded-md p-4">
                    <code>{JSON.stringify(data, null, 2)}</code>
                </pre>
            ),
            position: "bottom-right",
            classNames: {
                content: "flex flex-col gap-2",
            },
            style: {
                "--border-radius": "calc(var(--radius)  + 4px)",
            } as React.CSSProperties,
        })
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
