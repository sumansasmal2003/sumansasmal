"use server";

export async function getGithubStats() {
  const query = `
    query($username: String!) {
      user(login: $username) {
        followers {
          totalCount
        }
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
                color
                date
              }
            }
          }
        }
        repositories(first: 100, orderBy: {field: UPDATED_AT, direction: DESC}) {
          totalCount
          nodes {
            languages(first: 5) {
              edges {
                size
                node {
                  name
                  color
                }
              }
            }
          }
        }
        recentEvents: repositories(first: 1, orderBy: {field: PUSHED_AT, direction: DESC}) {
          nodes {
            name
            url
            pushedAt
            refs(refPrefix: "refs/heads/", first: 1) {
              nodes {
                target {
                  ... on Commit {
                    message
                    history(first: 1) {
                      nodes {
                        message
                        committedDate
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `;

  try {
    const response = await fetch("https://api.github.com/graphql", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        query,
        variables: { username: process.env.GITHUB_USERNAME },
      }),
      next: { revalidate: 3600 }, // Cache data for 1 hour
    });

    const data = await response.json();
    return data.data.user;
  } catch (error) {
    console.error("GitHub Fetch Error:", error);
    return null;
  }
}
