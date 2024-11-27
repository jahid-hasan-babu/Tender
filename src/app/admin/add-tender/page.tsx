"use client";

import * as React from "react";
import Image from "next/image";
import footerLogo from "@/assets/image/footerLogo.png";
import bgImage2 from "@/assets/image/bg-image2.png";
import bgImage1 from "@/assets/image/bg-image1.png";
import { Download } from "lucide-react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import { fetchCompanyData } from "@/app/redux/slice/companySlice";
import Link from "next/link";

export default function RegisterTender() {
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  // Redux state
  const { companyData, loading, error } = useSelector(
    (state: RootState) => state.company
  );
  const dispatch = useDispatch();

  React.useEffect(() => {
    if (userId) {
      dispatch(fetchCompanyData(userId)); 
    }
  }, [userId, dispatch]);



  const handleDownload = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert("User is not authenticated. Please log in.");
      return;
    }

    try {
      console.log("Download initiated.");

      // API URL for downloading the questionnaire
      const downloadUrl = `https://white-camel-643529.hostingersite.com/api/companies/${userId}/download-questionnaires`;

      // Make a request to the API with the Authorization token
      const response = await fetch(downloadUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/octet-stream',
        },
      });

      if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`);
      }

      // Extract file blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;

      const contentDisposition = response.headers.get('Content-Disposition');
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : 'questionnaire.pdf';

      link.download = filename;
      link.click();

      // Clean up the URL object
      window.URL.revokeObjectURL(url);

      console.log("Download completed successfully.");
    } catch (error) {
      console.error("Error during download:", error);
      alert("An error occurred while downloading the questionnaire. Please try again.");
    }
  };

   const handleDownloadpdf = async () => {
    const authToken = localStorage.getItem('authToken');
    if (!authToken) {
      alert("User is not authenticated. Please log in.");
      return;
    }

    try {
      console.log("Download initiated.");

      // API URL for downloading the questionnaire
      const downloadUrl = `https://white-camel-643529.hostingersite.com/api/companies/${userId}/download-pdf`;

      // Make a request to the API with the Authorization token
      const response = await fetch(downloadUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${authToken}`,
          'Accept': 'application/octet-stream',
        },
      });

      if (!response.ok) {
        throw new Error(`Download failed: ${response.statusText}`);
      }

      // Extract file blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a temporary link and trigger download
      const link = document.createElement('a');
      link.href = url;

      const contentDisposition = response.headers.get('Content-Disposition');
      const filename = contentDisposition
        ? contentDisposition.split('filename=')[1].replace(/"/g, '')
        : 'questionnaire.pdf';

      link.download = filename;
      link.click();

      // Clean up the URL object
      window.URL.revokeObjectURL(url);

      console.log("Download completed successfully.");
    } catch (error) {
      console.error("Error during download:", error);
      alert("An error occurred while downloading the questionnaire. Please try again.");
    }
  };

  if (loading) {
    return <div className="text-center font-bold font-INTER text-4xl">Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <div>
      <Image src={bgImage2} alt="bgImage2" className="absolute float-end mt-[180px] lg:block hidden" />
      <div className="min-h-screen bg-gray-50 p-4 md:p-8">
        <div className="mx-auto max-w-3xl rounded-lg bg-white p-6 shadow-lg md:p-8">
          <div className="flex flex-col items-center pb-10">
            <div className="flex font-bold flex-col items-center md:items-start">
              <Image src={footerLogo} alt="Byrnecut Logo" className="pb-1" />
              <div className="text-center text-[13px] md:text-left leading-3">
                <p className="font-semibold">BYRNECUT</p>
                <p className="text-[9px]">BURKINA FASO</p>
              </div>
            </div>
          </div>

          <form className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="companyName" className="block text-sm font-medium text-black-balck-900">
                  Company name
                </label>
                <input
                  id="companyName"
                  type="text"
                  className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={companyData?.company_name || ""} 
                  disabled 
                />
              </div>

              <div>
                <label htmlFor="companyId" className="block text-sm font-medium text-black-black-900">
                  Company identification number (IFU, VAT Number)
                </label>
                <input
                  id="companyId"
                  type="text"
                  className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={companyData?.identification_number || ""} 
                  disabled
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
                className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={companyData?.email || ""}
                disabled
              />
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-black-balck-900">
                  Phone
                </label>
                <input
                  id="phone"
                  type="tel"
                  className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={companyData?.phone || ""}
                  disabled
                />
              </div>

              <div>
                <label htmlFor="phone2" className="block text-sm font-medium text-black-balck-900">
                  Phone 2 (optional)
                </label>
                <input
                  id="phone2"
                  type="tel"
                  className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={companyData?.phone2 || ""}
                  disabled
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
                className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                value={companyData?.address || ""}
                disabled
              />
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label htmlFor="country" className="block text-sm font-medium text-black">
                  Country
                </label>
                <input
                  id="country"
                  type="text"
                  className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={companyData?.country || ""}
                  disabled
                />
              </div>

              <div>
                <label htmlFor="town" className="block text-sm font-medium text-black">
                  Town
                </label>
                <input
                  id="town"
                  type="text"
                  className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={companyData?.town || ""}
                  disabled
                />
              </div>
              <div>
                <label htmlFor="province" className="block text-sm font-medium text-black">
                  Province
                </label>
                <input
                  id="province"
                  type="text"
                  className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  value={companyData?.province || ""}
                  disabled
                />
              </div>
            </div>

             <div className="grid gap-4 md:grid-cols-2 pb-10">
                            <div>
                                <label htmlFor="sector" className="block text-sm font-medium text-black">
                                    Sector of activity
                                </label>
                                <input
                                id="province"
                                type="text"
                                className="mt-1 block w-full border px-2 py-3 border-gray-400 rounded-md shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                value={companyData?.sector_of_activity || ""}
                                disabled
                              />
                            </div>

                            <div>
                                <h3 className="block text-sm font-medium text-black">
                                    Download questionnaire<span className="text-red-500">*</span>
                                </h3>
                                <button
                                    className="w-full  text-black-black-900 bg-white-white-50 flex justify-center border border-black-black-900 items-center rounded-md px-6 py-3 text-lg font-medium "
                                     onClick={handleDownload}
                                    type="button"
                                >
                                    Download questionnaire
                                    <Download
                                        className="ml-2 h-7 w-7 bg-black-black-900 text-white-white-50 p-1 rounded-full"/>
                                </button>
                            </div>
                        </div>
                        <Link  href={`/admin/client?email=${companyData?.email}&id=${companyData?.id}`}>
                      <div className="flex justify-center">
                            <button
                                type="submit"
                                className="text-center text-white-white-50 w-full lg:w-[50%] rounded-md font-INTER bg-yellow-500 px-4 py-2 text-lg font-bold text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
                            >
                                Create an account for this client
                            </button>
                        </div>
                       </Link>

                        <div className="flex justify-center">
                            <button
                                type="button"
                                onClick={handleDownloadpdf}
                                className="w-full lg:w-[50%] rounded-md bg-black-black-900 px-4 py-2 text-lg font-bold  shadow-sm  focus:outline-none focus:ring-2 text-white-white-50"
                            >
                                Download as PDF
                            </button>
                        </div>
          </form>
        </div>
      </div>
       <Image src={bgImage1} alt="bgImage1" className="relative  float-end mt-[-1000px] lg:block hidden"/>
    </div>
  );
}
