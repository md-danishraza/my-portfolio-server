export const experiences = [
  {
    id: 1,
    title: "Backend Developer Intern",
    company: "RemarkInfo Soft. Solution",
    location: "Remote",
    startDate: "June 2025",
    endDate: "Sep 2025",
    type: "Internship",
    achievements: [
      "Designed and maintained scalable RESTful APIs using Node.js and Express.js",
      "Managed PostgreSQL databases, ensuring data integrity and optimizing queries for performance",
      "Collaborated with frontend teams to integrate backend services and troubleshoot connectivity issues",
    ],
    technologies: ["Node.js", "Express.js", "PostgreSQL", "REST APIs", "Git"],
    icon: "💻", // You can use emoji or custom icon
    color: "#00a896", // Optional: custom color for this experience
  },
  {
    id: 2,
    title: "Web Development",
    company: "Independent / Academic Portfolio",
    location: "Self-directed",
    startDate: "2024",
    endDate: "Present",
    type: "Personal Projects",
    achievements: [
      "Building production-grade applications using MERN stack, PERN stack and Next.js to solve complex problems in different domains",
      "Applying industry-standard practices such as CI/CD, Versioning, Dockerization, and Agile development methodologies in a self-directed environment",
    ],
    technologies: ["MERN", "PERN", "Next.js", "Docker", "CI/CD", "Agile"],
    icon: "🚀",
    color: "#a80874",
  },
  // Add more experiences here easily
  // {
  //   id: 3,
  //   title: "Your New Role",
  //   company: "Company Name",
  //   location: "Location",
  //   startDate: "Month Year",
  //   endDate: "Month Year",
  //   type: "Full-time / Internship",
  //   achievements: [
  //     "Achievement 1",
  //     "Achievement 2",
  //     "Achievement 3"
  //   ],
  //   technologies: ["Tech1", "Tech2", "Tech3"],
  //   icon: "🌟",
  //   color: "#ff6b6b"
  // }
];

// Export tech stack colors for consistent styling
export const techColors = {
  "Node.js": "#339933",
  "Express.js": "#000000",
  PostgreSQL: "#336791",
  "REST APIs": "#FF6C37",
  Git: "#F05032",
  MERN: "#61DAFB",
  PERN: "#4479A1",
  "Next.js": "#000000",
  Docker: "#2496ED",
  "CI/CD": "#4285F4",
  Agile: "#FFA500",
  JavaScript: "#F7DF1E",
  TypeScript: "#3178C6",
  React: "#61DAFB",
  MongoDB: "#47A248",
  default: "#858585",
};
