"use client"

import * as React from "react"
import Image from "next/image"
import { Eye, EyeOff } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import footerLogo from "@/assets/image/footerLogo.png";
import bgImage2 from "@/assets/image/bg-image2.png"
import bgImage1 from "@/assets/image/bg-image1.png"
import { useSearchParams, useRouter } from "next/navigation"
import axios from "axios"
import { useDispatch } from 'react-redux'
import { setUser } from "@/app/redux/slice/userSlice"


export default function CreateClient() {
    const [showPassword, setShowPassword] = React.useState(false)
    const [password, setPassword] = React.useState('')
    const [confirmPassword, setConfirmPassword] = React.useState('')
    const [error, setError] = React.useState('')
    
    const searchParams = useSearchParams()
    const userEmail = searchParams.get("email") 
    const companyID = searchParams.get("id")

    const dispatch = useDispatch()
    const router = useRouter()

    // Retrieve authToken from localStorage
    const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null

const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
        setError("Passwords do not match");
        return;
    }

    try {
        const response = await axios.post(
            "https://white-camel-643529.hostingersite.com/api/users",
            {
                email: userEmail,
                company_id: companyID,
                password,
                password_confirmation: confirmPassword,
            },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            }
        );

        // Check if the account creation was successful
        if (response.status === 201) {
            // Dispatch the user and authToken to Redux store if needed
            dispatch(
                setUser({
                    email: userEmail,
                    companyId: companyID,
                    authToken: token || "", // Ensure you pass the token
                })
            );

            // Redirect to the /admin/members page
            router.push("/admin/members");
        } else {
            setError("Failed to create account. Please try again.");
        }
    } catch (err: any) {
        // Handle any errors during the request
        setError(err.response?.data?.message || "An error occurred. Please try again.");
    }
};


    return (
        <div>
            <Image src={bgImage2} alt="bgImage2" className="absolute float-end mt-[140px] lg:block hidden" />
            <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
                <div className="w-full max-w-md ">
                    <div className="flex flex-col items-center ">
                        <div className="flex font-bold flex-col items-center md:items-start">
                            <Image src={footerLogo} alt="Byrnecut Logo" className="pb-1" />
                            <div className="text-center text-[13px] md:text-left leading-3">
                                <p className="font-semibold">BYRNECUT</p>
                                <p className="text-[9px]">BURKINA FASO</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="text-2xl font-semibold tracking-tight py-2">Make an account for client</h1>
                        </div>
                    </div>
                    <form className="space-y-4" onSubmit={handleSubmit}>
                        <div className="space-y-2">
                            <Label htmlFor="username">Email</Label>
                            <Input
                                id="email"
                                value={userEmail}
                                type="text"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                required
                                className="border border-gray-400 rounded-md outline-0 focus:border-0"
                                readOnly
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative border border-gray-400 rounded-md">
                                <Input
                                    id="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="*&#oasgf"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff className="h-4 w-4 text-black-black-900" />
                                    ) : (
                                        <Eye className="h-4 w-4 text-black-black-900" />
                                    )}
                                    <span className="sr-only">
                                        {showPassword ? "Hide password" : "Show password"}
                                    </span>
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirm-password">Confirm Password</Label>
                            <div className="relative border border-gray-400 rounded-md">
                                <Input
                                    id="cpassword"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="*&#oasgf"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                />
                            </div>
                        </div>
                        {error && <p className="text-red-500 text-sm">{error}</p>}
                        <div className="flex items-center justify-end"></div>
                        <Button type="submit" className="w-full text-white-white-50 bg-yellow-500">
                            Create Account
                        </Button>
                    </form>
                </div>
            </div>
            <Image src={bgImage1} alt="bgImage1" className="relative float-end mt-[-1000px] lg:block hidden" />
        </div>
    )
}
