import { useState, useEffect } from "react";
import { useLocalStorage } from "./utils/useLocalStorage";
import { EXPERIENCE_LEVELS, TECH_STACK_OPTIONS } from "./utils/constants";
import CandidateForm from "./components/CandidateForm";
import CandidateCard from "./components/CandidateCard";
import CandidateModal from "./components/CandidateModal";
import DashboardControls from "./components/DashboardControls";
import defaultCandidates from "./data/defaultCandidates.json";

function App() {
  const [candidates, setCandidates] = useLocalStorage("candidates", defaultCandidates);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [showAddModal, setShowAddModal] = useState(false);
  const [sortBy, setSortBy] = useState("name");
  const [filterRole, setFilterRole] = useState("");
  const [filterExperience, setFilterExperience] = useState("");
  const [filterTech, setFilterTech] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 9;

  // Load default candidates if localStorage is empty
  useEffect(() => {
    if (candidates.length === 0) {
      setCandidates(defaultCandidates);
    }
  }, [candidates, setCandidates]);

  const addCandidate = (newCandidate) => {
    setCandidates([...candidates, newCandidate]);
    setShowAddModal(false);
  };

  const filteredCandidates = candidates.filter((candidate) => {
    const roleMatch = candidate.jobRole
      .toLowerCase()
      .includes(filterRole.toLowerCase());
    const experienceMatch = filterExperience
      ? candidate.experienceLevel === filterExperience
      : true;
    const techMatch = filterTech
      ? candidate.techStack.includes(filterTech)
      : true;
    return roleMatch && experienceMatch && techMatch;
  });

  const sortedCandidates = [...filteredCandidates].sort((a, b) => {
    if (sortBy === "name") {
      return a.fullName.localeCompare(b.fullName);
    } else {
      const experienceOrder = { junior: 1, mid: 2, senior: 3 };
      return (
        experienceOrder[b.experienceLevel] - experienceOrder[a.experienceLevel]
      );
    }
  });

  // Pagination logic
  const indexOfLastCandidate = currentPage * candidatesPerPage;
  const indexOfFirstCandidate = indexOfLastCandidate - candidatesPerPage;
  const currentCandidates = sortedCandidates.slice(
    indexOfFirstCandidate,
    indexOfLastCandidate
  );
  const totalPages = Math.ceil(sortedCandidates.length / candidatesPerPage);

  const exportToCSV = () => {
    const headers = [
      "Name",
      "Job Role",
      "Experience Level",
      "LinkedIn",
      "GitHub",
      "Tech Stack",
    ];
    const csvContent = [
      headers.join(","),
      ...sortedCandidates.map((candidate) =>
        [
          `"${candidate.fullName}"`,
          `"${candidate.jobRole}"`,
          `"${candidate.experienceLevel}"`,
          `"${candidate.linkedInUrl}"`,
          `"${candidate.githubUrl}"`,
          `"${candidate.techStack.join(", ")}"`,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "candidates.csv");
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12 animate-slideUp">
          <h1 className="text-5xl md:text-6xl font-bold text-white mb-4 tracking-tight">
            Candidate Portfolio
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-300">
              Dashboard
            </span>
          </h1>
          <p className="text-xl text-white/80 font-light">
            Discover and manage talented developers with style
          </p>
        </div>

        <div className="w-full">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <button
              onClick={() => setShowAddModal(true)}
              className="btn-secondary text-white px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-xl flex items-center gap-3"
            >
              <span className="text-2xl">➕</span>
              Add New Candidate
            </button>
          </div>

          <div>
            <DashboardControls
              sortBy={sortBy}
              setSortBy={setSortBy}
              filterRole={filterRole}
              setFilterRole={setFilterRole}
              filterExperience={filterExperience}
              setFilterExperience={setFilterExperience}
              filterTech={filterTech}
              setFilterTech={setFilterTech}
              techOptions={TECH_STACK_OPTIONS}
            />

            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
              <div className="text-white">
                <h2 className="text-2xl font-bold mb-1">
                  {filteredCandidates.length}{" "}
                  {filteredCandidates.length === 1 ? "Candidate" : "Candidates"}{" "}
                  <span className="text-pink-300">Found</span>
                </h2>
                <p className="text-white/70">
                  {sortedCandidates.length > 0 && `Showing ${currentCandidates.length} of ${sortedCandidates.length} results`}
                </p>
              </div>
              <button
                onClick={exportToCSV}
                className="btn-accent text-white px-6 py-3 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={sortedCandidates.length === 0}
              >
                📊 Export to CSV
              </button>
            </div>

            {currentCandidates.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                  {currentCandidates.map((candidate, index) => (
                    <div key={candidate.id} className="animate-slideUp" style={{animationDelay: `${index * 0.1}s`}}>
                      <CandidateCard
                        candidate={candidate}
                        onClick={setSelectedCandidate}
                      />
                    </div>
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center mt-8">
                    <div className="flex items-center space-x-2 bg-white/10 backdrop-blur-lg rounded-2xl p-2 border border-white/20">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="px-4 py-2 rounded-xl text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        ← Previous
                      </button>
                      {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                        let page;
                        if (totalPages <= 5) {
                          page = i + 1;
                        } else if (currentPage <= 3) {
                          page = i + 1;
                        } else if (currentPage >= totalPages - 2) {
                          page = totalPages - 4 + i;
                        } else {
                          page = currentPage - 2 + i;
                        }
                        return (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-xl font-semibold transition-all duration-300 ${
                              currentPage === page
                                ? "bg-white text-purple-600 shadow-lg"
                                : "text-white hover:bg-white/20"
                            }`}
                          >
                            {page}
                          </button>
                        );
                      })}
                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 rounded-xl text-white hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                      >
                        Next →
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="card-modern p-12 rounded-2xl text-center animate-fadeIn">
                <div className="w-24 h-24 mx-auto mb-6 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                  <span className="text-4xl">🔍</span>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">No matches found</h3>
                <p className="text-gray-600 text-lg">
                  Try adjusting your filters to discover amazing candidates
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {selectedCandidate && (
        <CandidateModal
          candidate={selectedCandidate}
          onClose={() => setSelectedCandidate(null)}
        />
      )}

      {showAddModal && (
        <div className="fixed inset-0 modal-backdrop flex items-center justify-center p-4 z-50 animate-fadeIn">
          <CandidateForm 
            onAddCandidate={addCandidate} 
            onClose={() => setShowAddModal(false)}
          />
        </div>
      )}
    </div>
  );
}

export default App;
