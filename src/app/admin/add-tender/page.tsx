"use client";

import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import footerLogo from "@/assets/image/footerLogo.png";
import bgImage2 from "@/assets/image/bg-image2.png";
import bgImage1 from "@/assets/image/bg-image1.png";
import {Download} from "lucide-react";
import {useState} from "react";
import { FileText } from 'lucide-react';
import { Paperclip } from 'lucide-react';

export default function RegisterTender() {
    const [sector, setSector] = useState(""); // Use state to manage the sector selection

    const handleDownload = () => {
        if (!sector) {
            alert("Please select a sector of activity before downloading.");
            return;
        }

        console.log("Download initiated for sector:", sector);
        // Handle the actual download here, e.g., fetching a questionnaire based on the sector
    };
    return (
        <div>
            <Image src={bgImage2} alt="bgImage2" className="absolute float-end mt-[180px] lg:block hidden"/>
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

                    </div>

                    <form className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="companyName"
                                    className="block text-sm font-medium text-black-balck-900"
                                >
                                    Company name
                                </label>
                                <input
                                    id="companyName"
                                    type="text"
                                    className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="companyId"
                                    className="block text-sm font-medium text-black-black-900"
                                >
                                    Company identification number (IFU, VAT Number)
                                </label>
                                <input
                                    id="companyId"
                                    type="text"
                                    className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium text-black-balck-900"
                            >
                                E-mail address <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="phone"
                                    className="block text-sm font-medium text-black-balck-900"
                                >
                                    Phone
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="phone2"
                                    className="block text-sm font-medium text-black-balck-900"
                                >
                                    Phone 2 (optional)
                                </label>
                                <input
                                    id="phone2"
                                    type="tel"
                                    className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="address"
                                className="block text-sm font-medium text-black-balck-900"
                            >
                                Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="address"
                                type="text"
                                className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>

                        <div className="grid gap-4 md:grid-cols-3">
                            <div>
                                <label
                                    htmlFor="country"
                                    className="block text-sm font-medium text-black-balck-900"
                                >
                                    Country
                                </label>
                                <input
                                    id="country"
                                    type="text"
                                    className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="town"
                                    className="block text-sm font-medium text-black-balck-900"
                                >
                                    Town
                                </label>
                                <input
                                    id="town"
                                    type="text"
                                    className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="province"
                                    className="block text-sm font-medium text-black-balck-900"
                                >
                                    Province
                                </label>
                                <input
                                    id="province"
                                    type="text"
                                    className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md  shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>

                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label htmlFor="sector" className="block text-sm font-medium text-black">
                                    Sector of activity
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

                            <div>
                                <h3 className="block text-sm font-medium text-black">
                                    Attached questionnaire <span className="text-red-500">*</span>
                                </h3>
                                <button
                                    className="w-full  bg-black-black-900 text-white-white-50 flex justify-center items-center rounded-md px-6 py-3 text-lg font-medium "
                                    onClick={handleDownload}
                                >
                                    Download questionnaire
                                    <Download
                                        className="ml-2 h-7 w-7 text-black-black-900 bg-white-white-50 p-1 rounded-full"/>
                                </button>
                            </div>
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="text-center text-white-white-50 w-full lg:w-[50%] rounded-md font-INTER bg-yellow-500 px-4 py-2 text-lg font-bold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                            >
                                Create an account for this client
                            </button>
                        </div>

                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="w-full lg:w-[50%] rounded-md bg-black-black-900 px-4 py-2 text-lg font-bold  shadow-sm  focus:outline-none focus:ring-2 text-white-white-50"
                            >
                                Download as PDF
                            </button>
                        </div>

                    </form>
                </div>
            </div>
            <Image src={bgImage1} alt="bgImage1" className="relative  float-end mt-[-1200px] lg:block hidden"/>
        </div>
    );
}
