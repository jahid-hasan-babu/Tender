
import HeroSection from "@/components/home/HeroSection";
import InstructionAlert from "@/components/home/InstructionAlert";
import TableData from "@/components/home/TableData";
import {SiteHeader} from "@/components/sideheader";
import Footer from "@/components/Footer";



export default function Home() {
  return (

      <>
          <SiteHeader/>
          <HeroSection/>
          <InstructionAlert/>
          <TableData/>
          <Footer/>

      </>
  );
}
