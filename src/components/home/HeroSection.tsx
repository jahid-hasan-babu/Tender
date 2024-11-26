import { Button } from "@/components/ui/button";
import  delivery from  "@/assets/image/delivery.png"
import  hamber from "@/assets/image/hamber.png"
import Image from "next/image";

export default function HeroSection() {
    return (
        <div className="w-full mx-auto px-4 lg:px-0">
            <section className="relative w-full max-w-[1200px]  h-[600px] mx-auto overflow-hidden rounded-2xl">
                {/* Background Video */}
                <video
                    src="https://videos.pexels.com/video-files/4474927/4474927-uhd_2560_1440_30fps.mp4"
                    autoPlay
                    loop
                    muted
                    className="absolute inset-0 w-full h-full object-cover"
                />

                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-yellow-600/40" />

                {/* Content */}
                <div className="relative z-10 text-white flex h-full flex-col justify-center px-6 md:px-12 text-white-white-50">
                    <h1 className="text-3xl font-bold font-INTER leading-tight text-white md:text-[50px] lg:text-[85px]">
                        <span>Submission of </span>
                        <span className="inline-block bg-yellow-500">tenders</span>
                        <br />
                        <span>for the supply and</span>
                        <br />
                        <span className="inline-block bg-yellow-500 px-2">services</span>
                    </h1>

                    <div className="mt-8  flex gap-4 flex-wrap justify-center">
                        <Button
                            variant="default"
                            className="bg-black-black-900  text-lg "
                            size="lg"
                        >
                            Register
                            <Image src={delivery} alt="delivery image" />
                        </Button>
                        <Button
                            variant="default"
                            className="bg-yellow-500 text-lg text-black-black-900"
                            size="lg"
                        >
                            Login
                           <Image src={hamber} alt="hamber image" />
                        </Button>
                    </div>
                </div>
            </section>
        </div>
    );
}
