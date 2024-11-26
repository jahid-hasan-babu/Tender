export default function InstructionAlert() {
    return (
        <div className="w-full max-w-[1200px] mx-auto px-4">
            <div className="space-y-4 py-10">
                {/* Alert Section */}
                <div className="flex justify-center items-baseline py-5 bg-orange-100 rounded-lg shadow-md">
                    {/* Icon */}
                    <p className="text-2xl font-bold text-white bg-yellow-500 px-5 py-2 rounded-full">!</p>
                    
                    {/* Text Section */}
                    <div className="ml-5 mt-[-30px] text-gray-900 w-full md:w-[50%] lg:w-[40%] text-center md:text-left">
                        If you wish to apply for the offers below, you must submit a pre-qualification by clicking
                        on{" "}
                        <span className="font-semibold">« Register »</span> if you don&apos;t have an account yet. Follow the
                        instructions on the page that will open.
                    </div>
                </div>
                
                {/* Footer Text */}
                <p className="text-sm text-gray-600 text-center">
                    For more details, see the guide. Check the validity of your email address and internet connection or
                    check your Spam folder if you have not seen the email.
                </p>
            </div>
        </div>
    );
}
