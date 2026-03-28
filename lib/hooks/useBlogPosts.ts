import { useQuery } from "@tanstack/react-query";

export interface BlogPost {
  id: string;
  title: string;
  description: string;
  tags: string[];
  image_urls: string[];
  created_at: string;
}

async function fetchBlogPosts(): Promise<BlogPost[]> {
  const res = await fetch("/api/blog");
  if (!res.ok) throw new Error("Failed to fetch blog posts");
  return res.json();
}

export function useBlogPosts() {
  return useQuery<BlogPost[]>({
    queryKey: ["blog_posts"],
    queryFn: fetchBlogPosts,
  });
}
