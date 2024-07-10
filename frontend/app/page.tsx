import Image from "next/image";
import { FeatureCard as Card} from "@/components/FeatureCard";
import { GetStarted } from "@/components/GetStarted";
import { TC } from "@/components/TC";
import Footer from "@/components/Footer";
import { Socials } from "@/utils/Socials";

export default function Home() {
  return (
   <>
   <div className="bg-white dark:bg-black min-h-screen">
    <div className="pt-2 border-b border-black dark:border-white pb-7">
      <h1 className="text-purple-500 flex justify-center font-bold text-2xl">
        Boost Your Course with BoostHub
      </h1>
    </div>
    <div className="dark:text-white font-semibold text-center pt-3">
      BoostHub is a Platform where Creators can promote their courses for free
    </div>
    <div className="grid grid-cols-1 md:grid-cols-3 md:gap-2">
      <Card 
        title="Why BoostHub?" 
        answer="BoostHub allows creators to upload and promote their courses for free, while students can search for the best courses, give ratings, like, and comment."
      />
      <Card 
        title="How does BoostHub help students find the best courses?" 
        answer="Students can use search and filter tools to find top-rated courses and read reviews from other learners."
      />
      <Card 
        title="What benefits do creators get from BoostHub?" 
        answer="Creators can promote their courses for free, gain visibility, and receive feedback to improve their content."
      />
    </div>
    <div>
      <GetStarted/>
    </div>
    <div className="mb-7">
      <TC/>
    </div>
    <div className="mt-3">
   <Footer className="bg-purple-500 text-white" owner="BoostHub@2024" socials={Socials}/>
    </div>
   </div>
   </>
  );
}
