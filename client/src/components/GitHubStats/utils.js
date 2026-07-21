// // In utils.js - Fixed date handling

// export const fetchGitHubData = async (username, token) => {
//   try {
//     // Get today's date and 365 days ago
//     const today = new Date();
//     const lastYear = new Date();
//     lastYear.setDate(today.getDate() - 365);

//     const to = today.toISOString();
//     const from = lastYear.toISOString();

//     const query = `
//         query($username: String!, $from: DateTime!, $to: DateTime!) {
//           user(login: $username) {
//             name
//             avatarUrl
//             bio
//             company
//             location
//             websiteUrl
//             twitterUsername
//             followers {
//               totalCount
//             }
//             following {
//               totalCount
//             }
//             repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
//               nodes {
//                 name
//                 description
//                 url
//                 stargazerCount
//                 forkCount
//                 primaryLanguage {
//                   name
//                   color
//                 }
//               }
//             }
//             contributionsCollection(from: $from, to: $to) {
//               contributionCalendar {
//                 totalContributions
//                 weeks {
//                   contributionDays {
//                     contributionCount
//                     date
//                   }
//                 }
//               }
//             }
//           }
//         }
//       `;

//     const response = await fetch("https://api.github.com/graphql", {
//       method: "POST",
//       headers: {
//         Authorization: `Bearer ${token}`,
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({
//         query,
//         variables: { username, from, to },
//       }),
//     });

//     const result = await response.json();

//     if (result.errors) {
//       throw new Error(result.errors[0].message);
//     }

//     const user = result.data.user;
//     const calendar = user.contributionsCollection.contributionCalendar;
//     const repos = user.repositories.nodes;

//     // Process weeks - ensure we have proper data
//     const weeks = calendar.weeks.map((week) =>
//       week.contributionDays.map((day) => day.contributionCount)
//     );

//     // Calculate max count for colors
//     const allCounts = weeks.flat();
//     const maxCount = Math.max(...allCounts);

//     // Get first and last dates safely
//     const firstWeek = calendar.weeks[0];
//     const lastWeek = calendar.weeks[calendar.weeks.length - 1];

//     const firstDate = firstWeek?.contributionDays[0]?.date;
//     const lastDate =
//       lastWeek?.contributionDays[lastWeek.contributionDays.length - 1]?.date;

//     // console.log("Date debug:", {
//     //   firstDate,
//     //   lastDate,
//     //   weeksCount: calendar.weeks.length,
//     //   lastWeekDays: lastWeek?.contributionDays.length,
//     // });

//     // Process languages
//     const languages = {};
//     repos.forEach((repo) => {
//       if (repo.primaryLanguage) {
//         const langName = repo.primaryLanguage.name;
//         languages[langName] = (languages[langName] || 0) + 1;
//       }
//     });

//     const topLanguages = Object.entries(languages)
//       .sort((a, b) => b[1] - a[1])
//       .slice(0, 5)
//       .map(([name, count]) => ({
//         name,
//         count,
//         color:
//           repos.find((r) => r.primaryLanguage?.name === name)?.primaryLanguage
//             ?.color || "#858585",
//       }));

//     return {
//       user: {
//         name: user.name || username,
//         avatar: user.avatarUrl,
//         bio: user.bio || "Full Stack Developer",
//         company: user.company,
//         location: user.location,
//         blog: user.websiteUrl,
//         twitter: user.twitterUsername,
//         followers: user.followers.totalCount,
//         following: user.following.totalCount,
//       },
//       repos,
//       totalStars: repos.reduce((acc, repo) => acc + repo.stargazerCount, 0),
//       totalForks: repos.reduce((acc, repo) => acc + repo.forkCount, 0),
//       totalCommits: calendar.totalContributions,
//       topLanguages,
//       repoCount: repos.length,
//       contributionCalendar: {
//         weeks,
//         maxCount,
//         totalContributions: calendar.totalContributions,
//         firstDate,
//         lastDate,
//       },
//     };
//   } catch (error) {
//     console.error("Error fetching GitHub data:", error);
//     throw error;
//   }
// };

// src/components/GitHubStats/utils.js
// Removed Apollo Client dependency - using native fetch instead

// Get user's first contribution date
async function getFirstContributionDate(username, token) {
  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionYears
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { username } }),
  });

  const result = await response.json();

  if (result.errors) {
    console.error("GraphQL Errors:", result.errors);
    // Fallback to current year if can't get first year
    return new Date().getFullYear() - 1;
  }

  const years =
    result.data?.user?.contributionsCollection?.contributionYears || [];
  return years.length ? Math.min(...years) : new Date().getFullYear() - 1;
}

// Fetch contributions for a specific year
async function fetchContributionsForYear(username, token, year) {
  const from = `${year}-01-01T00:00:00Z`;
  const to = `${year + 1}-01-01T00:00:00Z`;

  const query = `
    query($username: String!, $from: DateTime!, $to: DateTime!) {
      user(login: $username) {
        contributionsCollection(from: $from, to: $to) {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                date
                color
              }
            }
          }
        }
      }
    }
  `;

  const response = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ query, variables: { username, from, to } }),
  });

  const result = await response.json();

  if (result.errors) {
    console.error(`GraphQL Errors for year ${year}:`, result.errors);
    return {
      year,
      totalContributions: 0,
      weeks: [],
      maxCount: 0,
    };
  }

  const calendar =
    result.data?.user?.contributionsCollection?.contributionCalendar;

  // Get max count for color scaling
  let maxCount = 0;
  if (calendar?.weeks) {
    const allCounts = calendar.weeks.flatMap((w) =>
      w.contributionDays.map((d) => d.contributionCount)
    );
    maxCount = Math.max(...allCounts, 0);
  }

  return {
    year,
    totalContributions: calendar?.totalContributions || 0,
    weeks: calendar?.weeks || [],
    maxCount: maxCount,
  };
}

// Main fetch function
export async function fetchGitHubData(username, token) {
  try {
    // Get all years with contributions
    const firstYear = await getFirstContributionDate(username, token);
    const currentYear = new Date().getFullYear();
    const years = Array.from(
      { length: currentYear - firstYear + 1 },
      (_, i) => firstYear + i
    );

    console.log(`Fetching contributions for years: ${years.join(", ")}`);

    // Fetch contributions for each year in parallel
    const yearlyContributions = await Promise.all(
      years.map((year) => fetchContributionsForYear(username, token, year))
    );

    // Filter out years with no contributions
    const filteredYearlyContributions = yearlyContributions.filter(
      (year) => year.totalContributions > 0 || year.weeks.length > 0
    );

    // Fetch user info and repos using REST API
    const headers = { Authorization: `token ${token}` };

    const [userRes, reposRes] = await Promise.all([
      fetch(`https://api.github.com/users/${username}`, { headers }),
      fetch(
        `https://api.github.com/users/${username}/repos?per_page=100&sort=updated`,
        { headers }
      ),
    ]);

    if (!userRes.ok || !reposRes.ok) {
      throw new Error("Failed to fetch user or repository data");
    }

    const user = await userRes.json();
    const repos = await reposRes.json();

    // Process languages
    const languages = {};
    repos.forEach((repo) => {
      if (repo.language) {
        languages[repo.language] = (languages[repo.language] || 0) + 1;
      }
    });

    const topLanguages = Object.entries(languages)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([name, count]) => ({ name, count }));

    // Calculate total commits across all years
    const totalCommits = filteredYearlyContributions.reduce(
      (acc, year) => acc + year.totalContributions,
      0
    );

    // Calculate total stars and forks
    const totalStars = repos.reduce(
      (acc, repo) => acc + repo.stargazers_count,
      0
    );
    const totalForks = repos.reduce((acc, repo) => acc + repo.forks_count, 0);

    return {
      user: {
        name: user.name || username,
        avatar: user.avatar_url,
        bio: user.bio || "Full Stack Developer",
        company: user.company,
        location: user.location,
        blog: user.blog,
        twitter: user.twitter_username,
        followers: user.followers,
        following: user.following,
      },
      repos,
      totalStars,
      totalForks,
      totalCommits,
      topLanguages,
      yearlyContributions: filteredYearlyContributions,
      firstYear,
    };
  } catch (error) {
    console.error("Error fetching GitHub data:", error);
    throw error;
  }
}
