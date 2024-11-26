import Image from "next/image"
import Link from "next/link"
import footerLogo from "@/assets/image/footerLogo.png"

export default function Footer() {
    return (
        <footer className="w-full bg-[#6B4D00] text-white-white-50">
            <div className="  mx-auto px-4 lg:px-0  pt-20 pb-10">
                <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                    {/* Logo and Company Name */}
                    <div className="flex flex-col items-center md:items-start">
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

                    {/* Contact Information */}
                    <div className="text-center md:text-left font-INTER">
                        <h2 className="text-2xl font-semibold mb-2">Contact us</h2>
                        <div className="space-y-1">
                            <p>
                                <Link href="mailto:example@email.com" className="hover:underline">
                                    Email: example@email.com
                                </Link>
                            </p>
                            <p>
                                <Link href="tel:01XXXXXXXXX" className="hover:underline">
                                    Phone: 01XXXXXXXXX
                                </Link>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Legal Notice */}
                <div className="mt-8 pt-4 border-t border-orange-500 text-center text-sm">
                    <p>Legal notice © {new Date().getFullYear()} Byrnecut.com - All rights reserved</p>
                </div>
            </div>
        </footer>
    )
}

