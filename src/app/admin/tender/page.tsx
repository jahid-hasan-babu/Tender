"use client";

import * as React from "react";
import Image from "next/image";
import footerLogo from "@/assets/image/footerLogo.png";
import bgImage2 from "@/assets/image/bg-image2.png";
import bgImage1 from "@/assets/image/bg-image1.png";
import {useRef, useState} from "react";
import {Paperclip} from "lucide-react";


export default function Register() {
    const [sector, setSector] = useState("");
    const [selectedFile, setSelectedFile] = useState<File | null>(null)
    const [error, setError] = useState<string>('')
    const fileInputRef = useRef<HTMLInputElement>(null)

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0]
        setError('')

        if (!file) {
            setSelectedFile(null)
            return
        }

        // Check if file is a PDF
        if (file.type !== 'application/pdf') {
            setError('Please upload a PDF file')
            setSelectedFile(null)
            if (fileInputRef.current) {
                fileInputRef.current.value = ''
            }
            return
        }

        setSelectedFile(file)
    }

    const handleBrowseClick = () => {
        fileInputRef.current?.click()
    }


    return (
        <div>
            <Image src={bgImage2} alt="bgImage2" className="absolute float-end mt-[140px] lg:block hidden"/>
            <div className="min-h-screen bg-gray-50 p-4 md:p-8">
                <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-lg md:p-8">
                    <div className="flex flex-col items-center pb-10">
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
                        <h1 className="my-8 text-center text-2xl font-bold md:text-3xl">
                            Add new tender
                        </h1>

                    </div>

                    <form className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="companyName"
                                    className="block text-sm font-medium text-black-balck-900"
                                >
                                    Company name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="companyName"
                                    type="text"
                                    className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label htmlFor="sector" className="block text-sm font-medium text-black">
                                    Department <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="sector"
                                    value={sector}
                                    onChange={(e) => setSector(e.target.value)} // Update state when user selects a sector
                                    className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                >
                                    <option value="">None</option>
                                    <option value="mining">Mining</option>
                                    <option value="construction">Construction</option>
                                    <option value="energy">Energy</option>
                                    <option value="manufacturing">Manufacturing</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                        </div>

                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-black-balck-900"
                            >
                                Title <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="title"
                                type="text"
                                className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="start-date"
                                    className="block text-sm font-medium text-black-balck-900"
                                >
                                    Start date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="start-date"
                                    type="date"
                                    className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="end-date"
                                    className="block text-sm font-medium text-black-balck-900"
                                >
                                    Closing date <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="end-date"
                                    type="date"
                                    className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>

                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium mb-1">
                                        Upload PDF file <span className="text-red-500">*</span>
                                    </label>
                                    <input
                                        type="file"
                                        accept=".pdf,application/pdf"
                                        onChange={handleFileChange}
                                        ref={fileInputRef}
                                        className="hidden"
                                    />
                                    <div
                                        onClick={handleBrowseClick}
                                        className="w-full h-32 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center cursor-pointer hover:border-gray-400 transition-colors"
                                    >
                                        <div className="text-center">
                                            <button
                                                type="button"
                                                className="px-4 py-2 flex items-center bg-black-black-900 text-white-white-50 rounded-lg hover:bg-gray-800 transition-colors"
                                            >
                                                Browse
                                                <Paperclip className="ml-2 text-black-black-900 bg-white-white-50 rounded-full p-1 w-[30] h-[30]"/>
                                            </button>
                                            {selectedFile && (
                                                <p className="mt-2 text-sm text-gray-600">
                                                    Selected: {selectedFile.name}
                                                </p>
                                            )}
                                            {!selectedFile && (
                                                <p className="mt-2 text-sm text-gray-500">
                                                    Click to select a PDF file
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    {error && (
                                        <p className="mt-2 text-sm text-red-500">
                                            {error}
                                        </p>
                                    )}
                                </div>

                        </div>

                        <div className="items-center text-center">
                            <button
                                type="submit"
                                className=" w-[50%] rounded-md bg-yellow-400 px-4 py-2 text-sm font-medium text-black shadow-sm hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                            >
                                Register
                            </button>

                        </div>
                    </form>
                </div>
            </div>
            <Image src={bgImage1} alt="bgImage1" className="relative  float-end mt-[-1000px] lg:block hidden"/>
        </div>
    );
}
