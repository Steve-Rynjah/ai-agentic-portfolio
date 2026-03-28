import { useQuery, useQueryClient } from "@tanstack/react-query";
import type { BlogPost } from "./useBlogPosts";

async function fetchBlogPost(id: string): Promise<BlogPost> {
  const res = await fetch(`/api/blog/${id}`);
  if (!res.ok) throw new Error("Failed to fetch blog post");
  return res.json();
}

export function useBlogPost(id: string) {
  const queryClient = useQueryClient();

  return useQuery<BlogPost>({
    queryKey: ["blog_post", id],
    queryFn: () => fetchBlogPost(id),
    // Use the already-cached list to hydrate instantly — no API call if list was loaded
    initialData: () => {
      const posts = queryClient.getQueryData<BlogPost[]>(["blog_posts"]);
      return posts?.find((p) => p.id === id);
    },
    initialDataUpdatedAt: () =>
      queryClient.getQueryState(["blog_posts"])?.dataUpdatedAt,
  });
}
