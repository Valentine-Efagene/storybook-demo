import type { Meta, StoryObj } from '@storybook/nextjs-vite';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm, Controller } from 'react-hook-form'
import * as z from 'zod'
import { useState } from 'react'

import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Field, FieldGroup } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { FormLabel } from '@/components/form/FormLabel'
import { FormPasswordInput } from '@/components/form/FormPasswordInput'
import { useServerMutation } from '@/hooks/useServerMutation'

// Create a query client for stories
const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: false, staleTime: Infinity },
        mutations: { retry: false },
    },
})

const signInSchema = z.object({
    email: z.string().email('Please enter a valid email'),
    password: z.string().min(6, 'Password must be at least 6 characters'),
})

// Mock server action with realistic behavior
const mockSignIn = async (data: z.infer<typeof signInSchema>) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000))

    // Simulate different responses based on email
    if (data.email === 'error@example.com') {
        return {
            error: {
                form: ['Invalid credentials. Please try again.']
            }
        }
    }

    if (data.email === 'field-error@example.com') {
        return {
            error: {
                email: ['This email is not registered'],
                password: ['Incorrect password']
            }
        }
    }

    // Success response
    return {
        success: 'Successfully signed in! Redirecting...'
    }
}

function SignInFormWithReactQuery() {
    const form = useForm<z.infer<typeof signInSchema>>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    })

    const signInMutation = useServerMutation(mockSignIn, {
        setError: form.setError,
        mutationKey: ['signin'],
        invalidateQueries: [
            ['user'], // Invalidate user data
            ['auth'], // Invalidate auth state
        ],
        onSuccess: (data) => {
            console.log('Sign in successful:', data)
            form.reset()
        },
        showSuccessToast: true,
    })

    const onSubmit = async (data: z.infer<typeof signInSchema>) => {
        await signInMutation.mutateAsync(data)
    }

    return (
        <Card className="w-full max-w-md mx-auto">
            <CardHeader>
                <CardTitle>Sign In with React Query</CardTitle>
            </CardHeader>
            <CardContent>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FieldGroup>
                        <Controller
                            name="email"
                            control={form.control}
                            render={({ field, fieldState }) => (
                                <Field data-invalid={fieldState.invalid}>
                                    <FormLabel htmlFor="email">Email</FormLabel>
                                    <Input
                                        {...field}
                                        id="email"
                                        type="email"
                                        placeholder="Enter your email"
                                        disabled={signInMutation.isLoading}
                                    />
                                    {fieldState.error && (
                                        <p className="text-sm text-destructive mt-1">
                                            {fieldState.error.message}
                                        </p>
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
                                    placeholder="Enter your password"
                                    disabled={signInMutation.isLoading}
                                    error={fieldState.error?.message}
                                />
                            )}
                        />
                    </FieldGroup>

                    {signInMutation.isError && (
                        <div className="bg-destructive/10 text-destructive px-3 py-2 rounded text-sm">
                            {(signInMutation.error as any)?.message || 'An error occurred'}
                        </div>
                    )}

                    <Button
                        type="submit"
                        className="w-full"
                        disabled={signInMutation.isLoading}
                    >
                        {signInMutation.isLoading ? 'Signing In...' : 'Sign In'}
                    </Button>
                </form>

                <div className="mt-4 text-xs text-muted-foreground">
                    <p><strong>Test emails:</strong></p>
                    <ul className="list-disc list-inside space-y-1">
                        <li>success@example.com - Success response</li>
                        <li>error@example.com - Form-level error</li>
                        <li>field-error@example.com - Field-level errors</li>
                    </ul>
                </div>
            </CardContent>
        </Card>
    )
}

const meta = {
    title: 'Forms/React Query Integration',
    component: SignInFormWithReactQuery,
    decorators: [
        (Story: React.ComponentType) => (
            <QueryClientProvider client={queryClient}>
                <Story />
            </QueryClientProvider>
        ),
    ],
    parameters: {
        layout: 'centered',
        docs: {
            description: {
                component: `
## React Query Integration

This story demonstrates how React Query enhances our form handling with:

### Key Benefits
- **Automatic Cache Management**: Query invalidation after successful mutations
- **Optimistic Updates**: UI updates before server responses
- **Better Loading States**: Centralized loading state management
- **Enhanced Error Handling**: Proper error boundaries and recovery

### Features Demonstrated
- Form submission with loading states
- Form-level and field-level error handling
- Success responses with toast notifications
- Query invalidation after successful login
- Proper TypeScript integration

### Try It Out
Use the test emails to see different response behaviors:
- \`success@example.com\` - Successful login
- \`error@example.com\` - Form-level error
- \`field-error@example.com\` - Field-specific errors

### Technical Implementation
\`\`\`tsx
const signInMutation = useServerMutation(signInAction, {
  setError: form.setError,
  mutationKey: ['signin'],
  invalidateQueries: [
    ['user'], // Refresh user data
    ['auth'], // Refresh auth state
  ],
  onSuccess: (data) => {
    // Handle success
  },
  showSuccessToast: true,
})
\`\`\`
        `,
            },
        },
    },
} satisfies Meta<typeof SignInFormWithReactQuery>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {}

export const WithOptimisticUpdates: Story = {
    render: () => {
        const ProfileUpdateForm = () => {
            const [profile, setProfile] = useState({ name: 'John Doe', email: 'john@example.com' })

            const form = useForm({
                defaultValues: profile,
            })

            const updateMutation = useServerMutation(async (data: any) => {
                await new Promise(resolve => setTimeout(resolve, 1000))
                return { success: 'Profile updated successfully', user: data }
            }, {
                setError: form.setError,
                optimisticUpdate: {
                    queryKey: ['user', 'profile'],
                    updater: (oldData: any, newData: any) => ({ ...oldData, ...newData })
                },
                onSuccess: (response) => {
                    setProfile(response.user)
                }
            })

            return (
                <Card className="w-full max-w-md mx-auto">
                    <CardHeader>
                        <CardTitle>Profile Update (Optimistic)</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={form.handleSubmit(data => updateMutation.mutateAsync(data))}>
                            <FieldGroup>
                                <Field>
                                    <FormLabel>Name</FormLabel>
                                    <Input {...form.register('name')} disabled={updateMutation.isLoading} />
                                </Field>
                                <Field>
                                    <FormLabel>Email</FormLabel>
                                    <Input {...form.register('email')} type="email" disabled={updateMutation.isLoading} />
                                </Field>
                            </FieldGroup>
                            <Button type="submit" className="w-full mt-4" disabled={updateMutation.isLoading}>
                                {updateMutation.isLoading ? 'Updating...' : 'Update Profile'}
                            </Button>
                        </form>

                        <div className="mt-4 p-3 bg-muted rounded text-sm">
                            <strong>Current Profile:</strong>
                            <pre className="mt-1 text-xs">{JSON.stringify(profile, null, 2)}</pre>
                        </div>
                    </CardContent>
                </Card>
            )
        }

        return (
            <QueryClientProvider client={queryClient}>
                <ProfileUpdateForm />
            </QueryClientProvider>
        )
    },
    parameters: {
        docs: {
            description: {
                story: `
This example shows optimistic updates in action. When you submit the form:

1. The UI updates immediately with the new values
2. The server request happens in the background
3. If the request fails, changes are rolled back automatically
4. If successful, the changes are confirmed

This provides the best user experience with instant feedback.
        `,
            },
        },
    },
}