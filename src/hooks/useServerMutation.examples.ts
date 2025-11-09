import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useServerMutation } from "@/hooks/useServerMutation"
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'

// Example 1: User Profile Update with Optimistic Updates
const userProfileSchema = z.object({
    name: z.string().min(1, "Name is required"),
    email: z.string().email("Invalid email"),
    bio: z.string().optional(),
})

export function useUpdateProfile() {
    const form = useForm<z.infer<typeof userProfileSchema>>({
        resolver: zodResolver(userProfileSchema),
    })

    const updateProfileMutation = useServerMutation(updateUserProfile, {
        setError: form.setError,
        mutationKey: ['updateProfile'],
        invalidateQueries: [['user', 'profile']],
        optimisticUpdate: {
            queryKey: ['user', 'profile'],
            updater: (oldData: any, newData: any) => ({
                ...oldData,
                ...newData,
            })
        },
        onSuccess: () => {
            form.reset()
        },
        showSuccessToast: true,
    })

    return {
        form,
        updateProfile: updateProfileMutation.mutateAsync,
        isUpdating: updateProfileMutation.isLoading,
    }
}

// Example 2: Create Post with Cache Updates
const createPostSchema = z.object({
    title: z.string().min(1, "Title is required"),
    content: z.string().min(1, "Content is required"),
    tags: z.array(z.string()).optional(),
})

export function useCreatePost() {
    const queryClient = useQueryClient()
    const form = useForm<z.infer<typeof createPostSchema>>({
        resolver: zodResolver(createPostSchema),
    })

    const createPostMutation = useServerMutation(createPost, {
        setError: form.setError,
        mutationKey: ['createPost'],
        invalidateQueries: [
            ['posts'],
            ['posts', 'recent'],
            ['user', 'posts'],
        ],
        onSuccess: (response, variables) => {
            // Add the new post to the cache immediately
            queryClient.setQueryData(['posts'], (oldData: any) => {
                return {
                    ...oldData,
                    posts: [response.post, ...(oldData?.posts || [])],
                }
            })

            // Update post count
            queryClient.setQueryData(['posts', 'count'], (oldCount: number) => oldCount + 1)

            form.reset()
        },
        redirectTo: (response) => `/posts/${response.post.id}`,
    })

    return {
        form,
        createPost: createPostMutation.mutateAsync,
        isCreating: createPostMutation.isLoading,
        error: createPostMutation.error,
    }
}

// Example 3: Delete Item with Optimistic Removal
export function useDeletePost(postId: string) {
    const queryClient = useQueryClient()

    return useServerMutation(deletePost, {
        setError: () => { }, // No form for deletion
        mutationKey: ['deletePost', postId],
        optimisticUpdate: {
            queryKey: ['posts'],
            updater: (oldData: any) => ({
                ...oldData,
                posts: oldData?.posts?.filter((post: any) => post.id !== postId) || [],
            })
        },
        invalidateQueries: [
            ['posts'],
            ['user', 'posts'],
        ],
        onSuccess: () => {
            // Remove specific post from cache
            queryClient.removeQueries({ queryKey: ['posts', postId] })
        },
    })
}

// Example 4: Search with Debounced Query Updates
export function useSearchPosts() {
    const form = useForm<{ query: string }>({
        defaultValues: { query: '' }
    })

    const searchMutation = useServerMutation(searchPosts, {
        setError: form.setError,
        mutationKey: ['searchPosts'],
        onSuccess: (response, variables) => {
            // Cache search results
            const queryClient = useQueryClient()
            queryClient.setQueryData(['search', variables.query], response)
        },
        showSuccessToast: false, // Don't show toast for search
    })

    return {
        form,
        search: searchMutation.mutateAsync,
        isSearching: searchMutation.isLoading,
        results: searchMutation.data,
    }
}

// Example 5: Form with Dependent Queries
export function useCreateProjectWithTeam() {
    const queryClient = useQueryClient()

    // Fetch available team members
    const { data: teamMembers } = useQuery({
        queryKey: ['team', 'members'],
        queryFn: fetchTeamMembers,
    })

    const form = useForm<{
        name: string
        description: string
        teamMemberIds: string[]
    }>()

    const createProjectMutation = useServerMutation(createProject, {
        setError: form.setError,
        mutationKey: ['createProject'],
        invalidateQueries: [
            ['projects'],
            ['team', 'projects'],
        ],
        onSuccess: (response) => {
            // Update multiple related queries
            queryClient.setQueryData(['projects'], (oldData: any) => ({
                ...oldData,
                projects: [response.project, ...(oldData?.projects || [])],
            }))

            // Update team member project counts
            response.project.teamMembers?.forEach((member: any) => {
                queryClient.invalidateQueries({
                    queryKey: ['team', 'member', member.id, 'projects']
                })
            })

            form.reset()
        },
        redirectTo: (response) => `/projects/${response.project.id}`,
    })

    return {
        form,
        teamMembers,
        createProject: createProjectMutation.mutateAsync,
        isCreating: createProjectMutation.isLoading,
    }
}

// Mock server actions for examples
async function updateUserProfile(data: any) {
    // Implementation would call your actual server action
    return { success: "Profile updated successfully" }
}

async function createPost(data: any) {
    // Implementation would call your actual server action
    return {
        success: "Post created successfully",
        post: { id: Date.now().toString(), ...data }
    }
}

async function deletePost(data: { id: string }) {
    // Implementation would call your actual server action
    return { success: "Post deleted successfully" }
}

async function searchPosts(data: { query: string }) {
    // Implementation would call your actual server action
    return {
        success: "Search completed",
        results: [], // Search results
        total: 0
    }
}

async function createProject(data: any) {
    // Implementation would call your actual server action
    return {
        success: "Project created successfully",
        project: { id: Date.now().toString(), ...data }
    }
}

async function fetchTeamMembers() {
    // Implementation would fetch team members
    return []
}