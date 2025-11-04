import ProjectCard from "../components/ProjectCard";
import { PROJECTS } from "../assets/projects";

export default function Projects() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold">Projects</h1>
        <p className="text-white/70 mt-2 text-sm">
          핵심 프로젝트 몇 개만 선정해 임팩트 중심으로 정리했습니다. (왜/무엇/결과)
        </p>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.slug} p={p} />
        ))}
      </section>
    </main>
  );
}
