"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import logo from "@/assets/image/logo.png"
import Image from "next/image"
import { usePathname } from "next/navigation"
import Folder from "@/assets/image/folder.png"
import { useDispatch, useSelector } from "react-redux"
import { useRouter } from 'next/navigation' // Import useRouter for redirect
import { logout } from "@/app/redux/slice/authSlice"

// Modal Component
function Modal({ isOpen, onClose, onLogout }: { isOpen: boolean, onClose: () => void, onLogout: () => void }) {
    return (
        <div
            className={`fixed top-center right-center lg:top-[80px] lg:right-[375px] z-50 border border-orange-500 rounded-md bg-white-white-50 bg-opacity-100 transition-opacity duration-300 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg p-6 w-50 space-y-4 relative mt-4 mr-4"
                onClick={(e) => e.stopPropagation()} // Prevent clicking inside the modal from closing it
            >
                <h2 className="text-xl font-bold text-center">See you soon</h2>
                <span className="block h-1 bg-gray-400 w-full mt-4 mb-4"/>

                <div className="flex justify-center gap-4">
                    <button
                        className="bg-red-500 text-white-white-50 py-2 px-4 rounded-md"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                    <button
                        className="bg-gray-500 text-white-white-50 py-2 px-4 rounded-md"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export function AdminNavbar() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isClient, setIsClient] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false) // State for modal
    const dispatch = useDispatch()
    const user = useSelector((state: any) => state.auth.user) // Accessing the user from the Redux store
    const router = useRouter() // Hook to handle redirection

    // This hook ensures that useRouter is used only on the client side
    useEffect(() => {
        setIsClient(true)
    }, [])

    if (!isClient) {
        // Return null or some placeholder until client-side hydration is complete
        return null
    }

    // Handle logout using Redux action and redirect to the homepage
    const handleLogout = () => {
        dispatch(logout()) // Dispatch the logout action
        setIsModalOpen(false) // Close the modal after logout
        router.push('/') // Redirect to the home page
    }

    return (
        <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-5 lg:px-0">
            <header className="sticky top-0 z-50 bg-background">
                <div className="flex h-20 items-center justify-between font-INTER">
                    {/* Logo */}
                    <Link href="/" className="flex items-center space-x-2">
                        <Image src={logo} alt="Logo" className="h-auto w-auto" />
                        <div className="flex flex-col">
                            <span className="text-lg font-bold">BYRNECUT</span>
                            <span className="text-sm font-bold">BURKINA FASO</span>
                        </div>
                    </Link>

                    {/* Mobile menu button */}
                    <button
                        className="lg:hidden"
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                    >
                        {isMenuOpen ? (
                            <X className="h-6 w-6" />
                        ) : (
                            <Menu className="h-6 w-6" />
                        )}
                    </button>

                    {/* Navigation for larger screens */}
                    <nav className="hidden lg:flex items-center space-x-6">
                        <NavItems />
                    </nav>

                    {/* Right section for larger screens */}
                    <div className="hidden lg:flex items-center space-x-4">
                        <LanguageSelector />
                        <AuthButtons openModal={() => setIsModalOpen(true)} />
                    </div>
                </div>

                {/* Mobile menu */}
                {isMenuOpen && (
                    <div className="lg:hidden mt-4">
                        <nav className="flex flex-col space-y-4 py-4">
                            <NavItems />
                            <LanguageSelector />
                            <AuthButtons openModal={() => setIsModalOpen(true)} />
                        </nav>
                    </div>
                )}
            </header>

            {/* Modal for logout */}
            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} onLogout={handleLogout} />
        </div>
    )
}

function NavItems() {
    const pathname = usePathname()
    const isActive = (path: string) => pathname === path

    return (
        <>
            <Link
                href="/admin/tenders"
                className={`text-lg text-black-black-400 ${isActive('/admin/tenders') ? 'font-bold text-black-black-900' : 'font-light'}`}
            >
                Tenders
            </Link>

            <Link
                href="/admin/applications"
                className={`text-lg text-black-black-400 ${isActive('/admin/applications') ? 'font-bold text-black-black-900' : 'font-light'}`}
            >
                New Application
            </Link>

            <Link
                href="/admin/members"
                className={`text-lg text-black-black-400 ${isActive('/admin/members') ? 'font-bold text-black-black-900' : 'font-light'}`}
            >
                All Members
            </Link>
        </>
    )
}

function LanguageSelector() {
    return (
        <div className="flex items-center space-x-1 text-sm">
            <Link
                href="/fr"
                className="transition-colors hover:text-primary"
            >
                FR
            </Link>
            <Link
                href="/en"
                className="font-medium transition-colors hover:text-primary rounded-full p-1 bg-black-black-900 text-white-white-50"
            >
                EN
            </Link>
        </div>
    )
}

function AuthButtons({ openModal }: { openModal: () => void }) {
    return (
        <>
            <Button className="bg-yellow-500 font-bold text-lg px-5 py-[24px]" asChild>
                <Link href="/admin/add-tender">Add tender
                    <Image src={Folder} alt="Folder" />
                </Link>
            </Button>
            <Button onClick={openModal}>
                <p className="bg-white-white-50 rounded-full p-5 text-black-black-900 font-bold text-xl py-3 px-[18px] border border-gray-400">A</p>
            </Button>
        </>
    )
}
