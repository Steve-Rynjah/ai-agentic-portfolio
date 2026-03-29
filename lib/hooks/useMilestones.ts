import { useQuery } from "@tanstack/react-query";

export interface CompanyHistory {
  company_name: string;
  from: string;
  to: string;
}

export interface MilestoneProject {
  project_name: string;
  status: "Completed" | "In Progress" | string;
}

export interface MilestoneSkill {
  skill_name: string;
  status: "Mastered" | "Proficient" | "Learning" | string;
}

export interface Achievement {
  description: string;
  link: string;
}

export interface Milestone {
  id: string;
  year: string;
  designation: string;
  company_history: CompanyHistory[];
  projects: MilestoneProject[];
  skills: MilestoneSkill[];
  achievements: Achievement[];
  created_at: string;
}

async function fetchMilestones(): Promise<Milestone[]> {
  const res = await fetch("/api/milestones");
  if (!res.ok) throw new Error("Failed to fetch milestones");
  return res.json();
}

export function useMilestones() {
  return useQuery<Milestone[]>({
    queryKey: ["milestones"],
    queryFn: fetchMilestones,
  });
}
