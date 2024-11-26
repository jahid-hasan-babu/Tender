'use client'

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, X } from 'lucide-react'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import logo from "@/assets/image/logo.png"
import Image from "next/image"

export function SiteHeader() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

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
              <AuthButtons />
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
              <div className="lg:hidden mt-4">
                <nav className="flex flex-col space-y-4 py-4">
                    {/*nav items */}
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
                  <AuthButtons />
                </nav>
              </div>
          )}
        </header>
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

function AuthButtons() {
  return (
      <>
        <Button className="font-bold text-lg bg-black-black-900 px-5 py-[24px] text-white-white-50" variant="outline" asChild>
          <Link href="/register">Register</Link>
        </Button>
        <Button className="bg-yellow-500 font-bold text-lg px-5 py-[24px]" asChild>
          <Link href="/login">Login</Link>
        </Button>
      </>
  )
}
