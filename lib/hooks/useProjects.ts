import { useQuery } from "@tanstack/react-query";

export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string | null;
  tags: string[];
  link_url: string;
  year: string;
}

async function fetchProjects(): Promise<Project[]> {
  const res = await fetch("/api/projects");
  if (!res.ok) throw new Error("Failed to fetch projects");
  return res.json();
}

export function useProjects() {
  return useQuery<Project[]>({
    queryKey: ["projects"],
    queryFn: fetchProjects,
  });
}
