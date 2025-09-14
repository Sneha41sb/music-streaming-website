import Link from "next/link";
import Allsongs from "./components/Allsongs";
import FrontendLayout from "./layouts/FrontendLayout";

export default function Home() {
  return (
    <FrontendLayout>
    <div className="min-h-screen pt-16">
      
         <Allsongs/>
    </div>
    </FrontendLayout>
  );
}
