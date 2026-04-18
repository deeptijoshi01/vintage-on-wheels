import { useEffect, useRef } from "react";

export default function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const targets = node.querySelectorAll
      ? node.querySelectorAll(".reveal, .reveal-left, .reveal-right")
      : [];

    // Also observe the node itself if it has a reveal class
    const allTargets = node.classList.contains("reveal") ||
      node.classList.contains("reveal-left") ||
      node.classList.contains("reveal-right")
      ? [node, ...targets]
      : [...targets];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -60px 0px" }
    );

    allTargets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return ref;
}