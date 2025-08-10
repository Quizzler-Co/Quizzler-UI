import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Trophy,
  Medal,
  ArrowLeft,
  Loader2,
  Users,
  RefreshCw,
} from "lucide-react";
import Button from "../components/ui-components/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "../components/ui-components/Card";
import Badge from "../components/ui-components/Badge";
import { UserService } from "../services/UserService";

// Helper to map rank to medal color/icon styling
const RankMedal = ({ rank }) => {
  const base =
    "w-10 h-10 flex items-center justify-center rounded-full text-white text-sm font-bold shadow";
  if (rank === 1)
    return (
      <div className={`${base} bg-yellow-400`}>
        <Trophy className="h-5 w-5" />
      </div>
    );
  if (rank === 2)
    return (
      <div className={`${base} bg-gray-300`}>
        <Medal className="h-5 w-5" />
      </div>
    );
  if (rank === 3)
    return (
      <div className={`${base} bg-amber-600`}>
        <Medal className="h-5 w-5" />
      </div>
    );
  return <div className={`${base} bg-blue-500`}>{rank}</div>;
};

const Leaderboard = () => {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [autoRefresh, setAutoRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const pageSize = 10;
  const [currentUserName, setCurrentUserName] = useState(null);

  const fetchLeaderboard = useCallback(async () => {
    if (!quizId) return;
    try {
      setLoading(true);
      setError(null);
      const token = UserService.getAuthToken();
      const res = await fetch(
        `http://localhost:8086/api/v1/leaderboard/quiz/${quizId}`,
        {
          headers: { Authorization: token, "Content-Type": "application/json" },
        }
      );
      if (!res.ok) throw new Error(`Failed to load leaderboard: ${res.status}`);
      const data = await res.json();
      setEntries(Array.isArray(data) ? data : []);
      setLastUpdated(new Date());
    } catch (e) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  }, [quizId]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  // fetch current user (cached) for highlight
  useEffect(() => {
    const user = UserService.getCachedUser();
    if (user?.username) setCurrentUserName(user.username);
  }, []);

  // auto-refresh interval
  useEffect(() => {
    if (!autoRefresh) return;
    const id = setInterval(() => {
      fetchLeaderboard();
    }, 15000); // 15s
    return () => clearInterval(id);
  }, [autoRefresh, fetchLeaderboard]);

  const topThree = entries.slice(0, 3);
  const rest = entries.slice(3);

  // Pagination applies only to rest
  const paginatedRest = useMemo(() => {
    const start = (page - 1) * pageSize;
    return rest.slice(start, start + pageSize);
  }, [rest, page]);

  const totalPages = Math.ceil(rest.length / pageSize) || 1;

  const goPage = (p) => {
    if (p < 1 || p > totalPages) return;
    setPage(p);
  };

  // Determine if we need to jump page to show current user highlight
  useEffect(() => {
    if (!currentUserName) return;
    const userEntry = rest.find((e) => e.userName === currentUserName);
    if (userEntry) {
      const idx = rest.indexOf(userEntry); // 0-based within rest
      const targetPage = Math.floor(idx / pageSize) + 1;
      if (targetPage !== page) setPage(targetPage);
    }
  }, [currentUserName, rest, page]);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      <div className="flex items-center justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
            <Trophy className="h-8 w-8 text-yellow-500" /> Quiz Leaderboard
          </h1>
          <p className="text-gray-600 mt-1 text-sm">
            Quiz ID: <span className="font-mono text-gray-800">{quizId}</span>
          </p>
          {lastUpdated && (
            <p className="text-xs text-gray-500 mt-1">
              Updated: {lastUpdated.toLocaleTimeString()}
            </p>
          )}
        </div>
        <div className="flex gap-2 items-center flex-wrap">
          <Button
            variant="outline"
            onClick={() => navigate(-1)}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </Button>
          <Button
            onClick={fetchLeaderboard}
            className="flex items-center gap-2"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />{" "}
            Refresh
          </Button>
          <label className="flex items-center gap-2 text-sm text-gray-600 cursor-pointer select-none">
            <input
              type="checkbox"
              checked={autoRefresh}
              onChange={(e) => setAutoRefresh(e.target.checked)}
              className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            Auto Refresh
          </label>
        </div>
      </div>

      {loading && (
        <div className="flex flex-col items-center justify-center py-16">
          <Loader2 className="h-10 w-10 animate-spin text-blue-600 mb-4" />
          <p className="text-gray-600">Loading leaderboard...</p>
        </div>
      )}

      {error && !loading && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
          <p className="text-red-700 font-medium mb-2">
            Failed to load leaderboard
          </p>
          <p className="text-sm text-red-600 mb-4">{error}</p>
          <Button onClick={fetchLeaderboard}>Retry</Button>
        </div>
      )}

      {!loading && !error && entries.length === 0 && (
        <div className="text-center py-20 bg-white border rounded-lg">
          <Users className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-700 mb-2">
            No entries yet
          </h3>
          <p className="text-gray-500 text-sm">
            Be the first to take this quiz and appear on the leaderboard!
          </p>
        </div>
      )}

      {!loading && !error && entries.length > 0 && (
        <>
          {/* Top 3 podium */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {topThree.map((entry) => (
              <Card
                key={entry.rank}
                className={`relative overflow-hidden ${
                  entry.rank === 1 ? "border-yellow-400" : ""
                }`}
              >
                <div className="absolute inset-0 pointer-events-none bg-gradient-to-br from-white via-transparent to-yellow-50" />
                <CardHeader className="flex items-center flex-col space-y-4">
                  <RankMedal rank={entry.rank} />
                  <CardTitle className="text-center w-full">
                    <span className="block text-lg font-semibold truncate max-w-[12rem]">
                      {entry.userName || "Unknown"}
                    </span>
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Badge variant="outline" size="sm">
                      Rank #{entry.rank}
                    </Badge>
                    <Badge variant="success" size="sm">
                      Score {entry.score}
                    </Badge>
                  </div>
                </CardHeader>
              </Card>
            ))}
          </div>

          {/* Rest of leaderboard */}
          {rest.length > 0 && (
            <Card className="mt-10">
              <CardHeader>
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <CardTitle className="text-lg">All Participants</CardTitle>
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-gray-500">
                      Page {page} / {totalPages}
                    </span>
                    <div className="flex items-center gap-1">
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={page === 1}
                        onClick={() => goPage(page - 1)}
                      >
                        &lt;
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        disabled={page === totalPages}
                        onClick={() => goPage(page + 1)}
                      >
                        &gt;
                      </Button>
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="overflow-x-auto">
                <table className="min-w-full text-sm">
                  <thead>
                    <tr className="text-left text-gray-600 border-b">
                      <th className="py-2 pr-4 font-medium">Rank</th>
                      <th className="py-2 pr-4 font-medium">User</th>
                      <th className="py-2 pr-4 font-medium">Score</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginatedRest.map((entry) => {
                      const isCurrent = entry.userName === currentUserName;
                      return (
                        <tr
                          key={entry.rank}
                          className={`border-b last:border-0 hover:bg-gray-50 ${
                            isCurrent ? "bg-blue-50" : ""
                          }`}
                        >
                          <td
                            className={`py-2 pr-4 font-semibold ${
                              isCurrent ? "text-blue-700" : "text-gray-800"
                            }`}
                          >
                            {entry.rank}
                          </td>
                          <td
                            className={`py-2 pr-4 ${
                              isCurrent
                                ? "text-blue-700 font-medium"
                                : "text-gray-700"
                            }`}
                          >
                            {entry.userName || "Unknown"}{" "}
                            {isCurrent && (
                              <span className="ml-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded-full">
                                You
                              </span>
                            )}
                          </td>
                          <td
                            className={`py-2 pr-4 font-medium ${
                              isCurrent ? "text-blue-700" : "text-gray-900"
                            }`}
                          >
                            {entry.score}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </CardContent>
            </Card>
          )}
        </>
      )}
    </div>
  );
};

export default Leaderboard;
