import ProjectCard from "../components/ProjectCard";
import { PROJECTS } from "../assets/projects";

export default function Projects() {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-white">
      <header className="mb-8">
        <h1 className="text-2xl sm:text-3xl font-extrabold">Projects</h1>
      </header>

      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {PROJECTS.map((p) => (
          <ProjectCard key={p.slug} p={p} />
        ))}
      </section>
    </main>
  );
}
