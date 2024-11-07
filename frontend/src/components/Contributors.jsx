import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Contributors.css";

function Contributors() {
  const [contributors, setContributors] = useState([]);
  const [repoStats, setRepoStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      let allContributors = [];
      let page = 1;

      try {
        const contributorsRequest = async () => {
          while (true) {
            const response = await axios.get(
              `https://api.github.com/repos/Swarnendu0123/adopt-pet/contributors`,
              {
                params: { per_page: 100, page },
              }
            );
            const data = response.data;
            if (data.length === 0) break; // Stop if no more contributors
            allContributors = [...allContributors, ...data];
            page++;
          }
          setContributors(allContributors);
        };

        const repoStatsRequest = async () => {
          const response = await axios.get(
            `https://api.github.com/repos/Swarnendu0123/adopt-pet`
          );
          setRepoStats(response.data);
        };

        // Wait for both requests to complete
        await Promise.all([contributorsRequest(), repoStatsRequest()]);
      } catch (error) {
        console.error("Error fetching data:", error.message);
        setError("Failed to load data. Please try again later.");
      } finally {
        setLoading(false); // Ensure loading is set to false regardless of success or error
      }
    }

    fetchData();
  }, []);

  // Calculate total contributions
  const totalContributions = contributors.reduce(
    (sum, contributor) => sum + contributor.contributions,
    0
  );

  return (
    <div className="contributors-container">
      <h1 className="contributors-title">Our Contributors</h1>

      {/* Stats Section */}
      <div className="repo-stats-section">
        <div className="repo-stat">
          <h3>Total Contributors</h3>
          <p>{contributors.length}</p>
        </div>
        <div className="repo-stat">
          <h3>Total Contributions</h3>
          <p>{totalContributions}</p>
        </div>
        <div className="repo-stat">
          <h3>GitHub Stars</h3>
          <p>{repoStats.stargazers_count || 0}</p>
        </div>
        <div className="repo-stat">
          <h3>Forks</h3>
          <p>{repoStats.forks_count || 0}</p>
        </div>
      </div>

      {/* Contributors Grid */}
      <div className="contributors-grid">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>{error}</p>
        ) : contributors.length > 0 ? (
          contributors.map((contributor) => (
            <div key={contributor.id} className="contributor-card">
              <a
                href={contributor.html_url}
                className="contributor-link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src={contributor.avatar_url}
                  alt={contributor.login}
                  className="contributor-avatar"
                />
              </a>
              <h2 className="contributor-name">{contributor.login}</h2>
              <p className="contributor-contributions">
                Contributions: {contributor.contributions}
              </p>
            </div>
          ))
        ) : (
          <p>No contributors found.</p>
        )}
      </div>
    </div>
  );
}

export default Contributors;
