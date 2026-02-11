import { caseStudies } from "@/lib/data";
import { SectionHeading, CaseStudyCard } from "@/components/ui";

export default function CaseStudies() {
  return (
    <section
      id="case-studies"
      className="pt-10 pb-20 lg:pt-12 lg:pb-28"
      style={{
        background: "linear-gradient(180deg, #ffffff 0%, #f8fafc 100%)",
      }}
    >
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <SectionHeading
          heading="Intelligent systems in operation"
          subtext="Designed, delivered, and operating at enterprise scale"
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
          {caseStudies.map((cs) => (
            <CaseStudyCard
              key={cs.client}
              client={cs.client}
              title={cs.title}
              summary={cs.summary}
              tags={cs.tags}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
