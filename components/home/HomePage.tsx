import {
  ActorsSection,
  BeliefsSection,
  CurrentStageSection,
  FinalCtaSection,
  FounderSection,
  HeroSection,
  ParticipationSection,
  ProblemSection,
  TechnologySection,
} from "@/components/home/sections";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProblemSection />
      <BeliefsSection />
      <ActorsSection />
      <CurrentStageSection />
      <TechnologySection />
      <ParticipationSection />
      <FounderSection />
      <FinalCtaSection />
    </>
  );
}
