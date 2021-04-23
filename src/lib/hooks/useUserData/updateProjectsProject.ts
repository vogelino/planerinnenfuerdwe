import { ProjectsType } from "@types/supabase";

export const updateProjectsProject = (
  projects: ProjectsType[],
  project: ProjectsType
): ProjectsType[] =>
  projects.reduce(
    (acc, currProject) => [
      ...acc,
      currProject.id === project.id ? project : currProject,
    ],
    [] as ProjectsType[]
  );

export const deleteProjectsProject = (
  projects: ProjectsType[],
  projectId: ProjectsType["id"]
): ProjectsType[] => projects.filter(project => project.id !== projectId);
