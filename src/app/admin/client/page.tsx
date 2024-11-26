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


export default function CreateClient() {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
        <div>
            <Image src={bgImage2} alt="bgImage2" className="absolute float-end mt-[140px] lg:block hidden"/>
            <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
                <div className="w-full max-w-md ">
                    <div className="flex flex-col items-center ">
                        <div className="flex font-bold flex-col items-center md:items-start">
                            <Image
                                src={footerLogo}
                                alt="Byrnecut Logo"
                                className="pb-1"

                            />
                            <div className="text-center text-[13px] md:text-left leading-3">
                                <p className="font-semibold">BYRNECUT</p>
                                <p className="text-[9px]">BURKINA FASO</p>
                            </div>
                        </div>
                        <div className="text-center">
                            <h1 className="text-2xl font-semibold tracking-tight py-2">Make an account for client</h1>
                        </div>
                    </div>
                    <form className="space-y-4">
                        <div className="space-y-2 ">
                            <Label htmlFor="username">Email</Label>
                            <Input
                                id="email"
                                placeholder="abc@gmail.com"
                                type="text"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                required
                                className="border border-gray-400 rounded-md outline-0 focus:border-0"
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Password</Label>
                            <div className="relative border border-gray-400 rounded-md ">
                                <Input
                                    id="password"
                                    placeholder="*&#oasgf"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent  "
                                    onClick={() => setShowPassword(!showPassword)}
                                >
                                    {showPassword ? (
                                        <EyeOff  className="h-4 w-4  text-black-black-900"/>
                                    ) : (
                                        <Eye className="h-4 w-4 text-black-black-900 "/>
                                    )}
                                    <span className="sr-only">
                  {showPassword ? "Hide password" : "Show password"}
                </span>
                                </Button>
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password">Confirm Password</Label>
                            <div className="relative border border-gray-400 rounded-md ">
                                <Input
                                    id="cpassword"
                                    placeholder="*&#oasgf"
                                    type={showPassword ? "text" : "password"}
                                    autoComplete="current-password"
                                    required
                                />
                                <Button
                                    type="button"
                                    variant="ghost"
                                    size="sm"
                                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent  "
                                    onClick={() => setShowPassword(!showPassword)}
                                >

                                </Button>
                            </div>
                        </div>
                        <div className="flex items-center justify-end">

                        </div>
                        <Button type="submit" className="w-full  text-white-white-50 bg-yellow-500 ">
                           Create Account
                        </Button>
                    </form>
                </div>
            </div>
            <Image src={bgImage1} alt="bgImage1" className="relative  float-end mt-[-1000px] lg:block hidden"/>
        </div>
    )
}

