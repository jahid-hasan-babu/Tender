"use client";


import * as React from "react";
import Image from "next/image";
import Link from "next/link";
import footerLogo from "@/assets/image/footerLogo.png";
import bgImage2 from "@/assets/image/bg-image2.png";
import bgImage1 from "@/assets/image/bg-image1.png";
import { Download, FileText, Paperclip, X } from "lucide-react";
import { useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { submitForm } from "../redux/slice/registrationSlice";
import { AnyAction, ThunkDispatch } from "@reduxjs/toolkit";
// import { submitForm } from "../redux/slice/registrationSlice";

export default function Register() {
    const dispatch: ThunkDispatch<RootState, unknown, AnyAction>  = useDispatch();
    const { loading, success, error } = useSelector((state: RootState) => state.registration);
    const [sector, setSector] = useState("");
    const [browseButtons, setBrowseButtons] = useState<string[]>([]);  // State to track Browse buttons
    const [formData, setFormData] = useState({
        companyName: '',
        companyId: '',
        email: '',
        phone: '',
        phone2: '',
        address: '',
        country: '',
        town: '',
        province: '',
    });


    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { id, value } = e.target;
        setFormData((prev) => ({ ...prev, [id]: value }));
    };


    const handleDownload = () => {
        if (!sector) {
            alert("Please select a sector of activity before downloading.");
            return;
        }


        console.log("Download initiated for sector:", sector);
        // Handle the actual download here, e.g., fetching a questionnaire based on the sector
    };


    const handleAddFile = () => {
        setBrowseButtons([...browseButtons, ""]);  // Add a new Browse button
    };


    const handleRemoveFile = (index: number) => {
        const updatedBrowseButtons = browseButtons.filter((_, i) => i !== index);  // Remove the file at the specific index
        setBrowseButtons(updatedBrowseButtons);
    };


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const data = new FormData();
        data.append("companyName", formData.companyName);
        data.append("companyId", formData.companyId);
        data.append("email", formData.email);
        data.append("phone", formData.phone);
        data.append("phone2", formData.phone2);
        data.append("address", formData.address);
        data.append("country", formData.country);
        data.append("town", formData.town);
        data.append("province", formData.province);
        data.append("sector", sector);


        // Handle file attachments (if any)
        browseButtons.forEach((_, index) => {
            const fileInput = document.getElementById(`fileInput-${index}`) as HTMLInputElement;
            if (fileInput?.files) {
                Array.from(fileInput.files).forEach(file => {
                    data.append("files", file);
                });
            }
        });


        // dispatch(submitForm(data));
        dispatch(submitForm(data))
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


                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label htmlFor="companyName" className="block text-sm font-medium text-black-balck-900">
                                    Company name <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="companyName"
                                    type="text"
                                    value={formData.companyName}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>


                            <div>
                                <label htmlFor="companyId" className="block text-sm font-medium text-black-balck-900">
                                    Company identification number (IFU, VAT Number) <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="companyId"
                                    type="text"
                                    value={formData.companyId}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>


                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-black-balck-900">
                                E-mail address <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="email"
                                type="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>


                        <div className="grid gap-4 md:grid-cols-2">
                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-black-balck-900">
                                    Phone <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="phone"
                                    type="tel"
                                    value={formData.phone}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>


                            <div>
                                <label htmlFor="phone2" className="block text-sm font-medium text-black-balck-900">
                                    Phone 2 (optional)
                                </label>
                                <input
                                    id="phone2"
                                    type="tel"
                                    value={formData.phone2}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>


                        <div>
                            <label htmlFor="address" className="block text-sm font-medium text-black-balck-900">
                                Address <span className="text-red-500">*</span>
                            </label>
                            <input
                                id="address"
                                type="text"
                                value={formData.address}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                            />
                        </div>


                        <div className="grid gap-4 md:grid-cols-3">
                            <div>
                                <label htmlFor="country" className="block text-sm font-medium text-black-balck-900">
                                    Country <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="country"
                                    type="text"
                                    value={formData.country}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>


                            <div>
                                <label htmlFor="town" className="block text-sm font-medium text-black-balck-900">
                                    Town <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="town"
                                    type="text"
                                    value={formData.town}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>


                            <div>
                                <label htmlFor="province" className="block text-sm font-medium text-black-balck-900">
                                    Province <span className="text-red-500">*</span>
                                </label>
                                <input
                                    id="province"
                                    type="text"
                                    value={formData.province}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                />
                            </div>
                        </div>


                        {/* Sector Selection */}
                        <div className="grid gap-4 md:grid-cols-2">
                              <div >
                                <label htmlFor="sector" className="block text-sm font-medium text-black-balck-900">
                                    Sector of activity <span className="text-red-500">*</span>
                                </label>
                                <select
                                    id="sector"
                                    name="sector"
                                    value={sector}
                                    onChange={(e) => setSector(e.target.value)}
                                    className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm"
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
                                <h3 className="block w-full text-sm font-medium text-black">
                                    Attached questionnaire
                                </h3>
                                <button
                                    className="w-full bg-black-black-900 text-white-white-50 flex justify-center items-center rounded-md px-6 py-3 text-lg font-medium"
                                    onClick={handleDownload} // Trigger the download functionality
                                >
                                    Download questionnaire
                                    <Download className="ml-2 h-7 w-7 text-black-black-900 bg-white-white-50 p-1 rounded-full"/>
                                </button>
                        </div>
                      </div>


                        {/* File Attachments */}
                        <div className="mt-4">
                            <h3 className="text-sm font-medium text-black-balck-900">Attached questionnaire</h3>
                            <div className="flex flex-wrap gap-4">
                                <button
                                    type="button"
                                    onClick={handleAddFile}
                                    className="bg-black-black-900 text-white-white-50 flex justify-center items-center rounded-md px-8 py-3 text-md font-light"
                                >
                                    Add files
                                      <FileText className="ml-2"/>
                                </button>


                                {browseButtons.map((_, index) => (
                                    <div key={index} className="flex items-center justify-between gap-3">
                                        <input
                                            type="file"
                                            id={`fileInput-${index}`}
                                            name={`file-${index}`}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor={`fileInput-${index}`}
                                            className="cursor-pointer rounded-md border border-gray-700 flex justify-center items-center px-8 py-3 text-md font-light"
                                        >
                                            Browse
                                             <Paperclip className="ml-2 bg-black-black-900 text-white-white-50 rounded-full p-1 w-[30] h-[30]" />
                                        </label>


                                        <button
                                            type="button"
                                            onClick={() => handleRemoveFile(index)}
                                            className="bg-red-500 rounded-full p-1 text-white"
                                        >
                                            <X />
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>


                       <div className="text-center mt-6">
                        <button
                            type="submit"
                            className="w-full md:w-1/2 rounded-md bg-yellow-400 px-6 py-3 text-md font-medium text-black"
                            disabled={loading} // Disable button when loading
                        >
                            {loading ? "Submitting..." : "Register"}
                        </button>


                        {error && typeof error === "string" && <p className="text-red-500 text-sm mt-2">{error}</p>}
                        {success && typeof success === "string" && <p className="text-green-500 text-sm mt-2">{success}</p>}
                   
                    <p className="text-center text-sm text-gray-500 pt-10 pb-5">
                                Already have an account?{" "}
                            </p>
                            <Link href="/login">
                                <button
                                    type="submit"
                                    className="w-[50%] rounded-md bg-black-black-900 px-4 py-2 text-sm font-medium text-black shadow-sm  focus:outline-none focus:ring-2 text-white-white-50"
                                >
                                    Login
                                </button>
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
            <Image src={bgImage1} alt="bgImage1" className="relative  float-end mt-[-1200px] lg:block hidden"/>
        </div>
    );
}



