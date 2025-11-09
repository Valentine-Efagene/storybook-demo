import Logo from "@/components/icons/Logo";
import { SignInForm } from "./SignInForm";

export default function page() {
    return (
        <div className="w-full min-h-screen bg-gray-50 flex items-center justify-center p-4">
            <div className="flex flex-col items-center gap-4 w-full">
                <Logo className="h-12" />
                <SignInForm />
            </div>
        </div>
    )
}
