'use client'

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import logo from "@/assets/image/logo.png"
import Image from "next/image"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function Modal({ isOpen, onClose, onLogout }: { isOpen: boolean, onClose: () => void, onLogout: () => void }) {
    return (
        <div
            className={`fixed top-0 left-0 right-0 bottom-0 z-50 bg-black bg-opacity-50 transition-opacity ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            onClick={onClose}
        >
            <div
                className="bg-white rounded-lg p-6 w-50 max-w-md mx-auto mt-24 relative"
                onClick={(e) => e.stopPropagation()} // Prevent clicking inside the modal from closing it
            >
                <h2 className="text-xl font-bold text-center">See you soon</h2>
                <span className="block h-1 bg-gray-400 w-full mt-4 mb-4"/>

                <div className="flex justify-center gap-4">
                    <button
                        className="bg-red-500 text-white py-2 px-4 rounded-md"
                        onClick={onLogout}
                    >
                        Logout
                    </button>
                    <button
                        className="bg-gray-500 text-white py-2 px-4 rounded-md"
                        onClick={onClose}
                    >
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeModal = () => setIsModalOpen(false)
  const openModal = () => setIsModalOpen(true)
  const handleLogout = () => {
    // Handle the logout logic here (e.g., clear tokens, redirect)
    console.log("Logging out...")
    closeModal()
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
                    onClick={toggleMenu}
                >
                    {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>

                {/* Navigation for larger screens */}
                <nav className="hidden lg:flex items-center space-x-6">
                    <NavItems />
                </nav>

                {/* Right section for larger screens */}
                <div className="hidden lg:flex items-center space-x-4">
                    <LanguageSelector />
                    <AuthButtons openModal={openModal} />
                </div>
            </div>

            {/* Mobile menu */}
            {isMenuOpen && (
                <div className="lg:hidden mt-4">
                    <nav className="flex flex-col space-y-4 py-4">
                        <>
                        <Link
                            href="/tenders"
                            className="text-lg font-light transition-colors hover:text-primary"
                        >
                            Tenders
                        </Link>
                        <Link href="/services"    className="text-lg font-light transition-colors hover:text-primary">Services</Link>
                        <Link href="/projects"    className="text-lg font-light transition-colors hover:text-primary">Projects</Link>
                        <Link href="/about"    className="text-lg font-light transition-colors hover:text-primary">About Us</Link>

                        <Link
                            href="/contact"
                            className="text-lg font-light transition-colors hover:text-primary"
                        >
                            Contact
                        </Link>
                    </>
                        <LanguageSelector />
                        <AuthButtons openModal={openModal} />
                    </nav>
                </div>
            )}
        </header>

        {/* Modal */}
        <Modal isOpen={isModalOpen} onClose={closeModal} onLogout={handleLogout} />
    </div>
  )
}

function NavItems() {
  return (
      <>
        <Link
            href="/tenders"
            className="text-lg font-light transition-colors hover:text-primary"
        >
          Tenders
        </Link>

        <DropdownMenu>
          <DropdownMenuTrigger className="hidden z-50 lg:flex items-center space-x-1 text-lg font-light transition-colors hover:text-primary">
            <span>Other pages</span>
            <ChevronDown className="h-4 w-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="z-50 bg-white-white-50">
            <DropdownMenuItem className="text-lg font-light">
              <Link href="/about" className="text-lg font-light">About Us</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-lg font-light">
              <Link href="/services">Services</Link>
            </DropdownMenuItem>
            <DropdownMenuItem className="text-lg font-light">
              <Link href="/projects">Projects</Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Link
            href="/contact"
            className="text-lg font-light transition-colors hover:text-primary"
        >
          Contact
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
        <Button className="font-bold text-lg bg-black text-white px-5 py-[24px]" variant="outline" asChild>
          <Link href="/register">Register</Link>
        </Button>
        <Button className="bg-yellow-500 font-bold text-lg px-5 py-[24px]" asChild>
          <Link href="/login">Login</Link>
        </Button>
        <Button onClick={openModal}>
           <p className="bg-white-white-50 rounded-full p-5 text-black-black-900 font-bold text-xl py-3 px-[18px] border border-gray-400">A</p>
        </Button>
      </>
    )
}
