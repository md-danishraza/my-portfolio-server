// src/hooks/useFetchProjects.jsx
import { useState, useEffect, useCallback, useRef } from "react";
import { createClient } from "contentful";

// Create client outside component to avoid recreating on each render
const createContentfulClient = () => {
  return createClient({
    space: import.meta.env.VITE_SPACE,
    environment: import.meta.env.VITE_ENVIRONMENT || "master",
    accessToken: import.meta.env.VITE_API,
  });
};

function useFetchProjects(options = {}) {
  const {
    limit = 100,
    skip = 0,
    autoFetch = true,
    select = "fields.title,fields.stack,fields.url,fields.code,fields.image,fields.description",
  } = options;

  const [loading, setLoading] = useState(autoFetch);
  const [projects, setProjects] = useState([]);
  const [error, setError] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const [total, setTotal] = useState(0);

  // Use ref to prevent multiple fetches in dev mode
  const fetchedRef = useRef(false);
  const clientRef = useRef(null);

  // Initialize client once
  if (!clientRef.current) {
    try {
      clientRef.current = createContentfulClient();
    } catch (err) {
      console.error("Failed to create Contentful client:", err);
      setError("Failed to initialize Contentful client");
    }
  }

  const fetchProjects = useCallback(
    async (fetchOptions = {}) => {
      const {
        fetchLimit = limit,
        fetchSkip = skip,
        fetchSelect = select,
      } = fetchOptions;

      if (!clientRef.current) {
        setError("Contentful client not initialized");
        setLoading(false);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await clientRef.current.getEntries({
          content_type: "projects",
          limit: fetchLimit,
          skip: fetchSkip,
          select: fetchSelect,
          order: ["-sys.createdAt"], // Order by creation date (newest first)
        });

        // Process items to ensure image URLs are optimized
        const processedItems = response.items.map((item) => ({
          ...item,
          fields: {
            ...item.fields,
            // Add optimized image URL with parameters
            image: item.fields.image
              ? {
                  ...item.fields.image,
                  optimizedUrl: `${item.fields.image.fields.file.url}?fm=webp&q=80&w=800`,
                }
              : null,
          },
        }));

        setProjects((prev) =>
          fetchSkip > 0 ? [...prev, ...processedItems] : processedItems
        );

        setHasMore(response.items.length === fetchLimit);
        setTotal(response.total);
      } catch (err) {
        console.error("Error fetching projects:", err);
        setError(err.message || "Failed to fetch projects");
      } finally {
        setLoading(false);
      }
    },
    [limit, skip, select]
  );

  // Load more projects (pagination)
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    const nextSkip = projects.length;
    await fetchProjects({
      fetchSkip: nextSkip,
    });
  }, [loading, hasMore, projects.length, fetchProjects]);

  // Reset and refetch
  const refetch = useCallback(() => {
    setProjects([]);
    fetchedRef.current = false;
    fetchProjects({ fetchSkip: 0 });
  }, [fetchProjects]);

  // Initial fetch
  useEffect(() => {
    if (autoFetch && clientRef.current && !fetchedRef.current) {
      fetchedRef.current = true;
      fetchProjects();
    }

    // Cleanup
    return () => {
      fetchedRef.current = false;
    };
  }, [autoFetch, fetchProjects]);

  return {
    loading,
    projects,
    error,
    hasMore,
    total,
    loadMore,
    refetch,
    isEmpty: projects.length === 0,
  };
}

export default useFetchProjects;
