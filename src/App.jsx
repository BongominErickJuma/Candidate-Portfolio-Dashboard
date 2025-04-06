import { useState, useEffect } from "react";
import { useLocalStorage } from "./utils/useLocalStorage";
import { EXPERIENCE_LEVELS, TECH_STACK_OPTIONS } from "./utils/constants";
import CandidateForm from "./components/CandidateForm";
import CandidateCard from "./components/CandidateCard";
import CandidateModal from "./components/CandidateModal";
import DashboardControls from "./components/DashboardControls";

function App() {
  const [candidates, setCandidates] = useLocalStorage("candidates", []);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [sortBy, setSortBy] = useState("name");
  const [filterRole, setFilterRole] = useState("");
  const [filterExperience, setFilterExperience] = useState("");
  const [filterTech, setFilterTech] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const candidatesPerPage = 9;

  const addCandidate = (newCandidate) => {
    setCandidates([...candidates, newCandidate]);
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
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8">
          Candidate Portfolio Dashboard
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <CandidateForm onAddCandidate={addCandidate} />
          </div>

          <div className="lg:col-span-2">
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

            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">
                {filteredCandidates.length}{" "}
                {filteredCandidates.length === 1 ? "Candidate" : "Candidates"}{" "}
                Found
              </h2>
              <button
                onClick={exportToCSV}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                disabled={sortedCandidates.length === 0}
              >
                Export to CSV
              </button>
            </div>

            {currentCandidates.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {currentCandidates.map((candidate) => (
                    <CandidateCard
                      key={candidate.id}
                      candidate={candidate}
                      onClick={setSelectedCandidate}
                    />
                  ))}
                </div>

                {totalPages > 1 && (
                  <div className="flex justify-center mt-6">
                    <div className="flex space-x-2">
                      <button
                        onClick={() =>
                          setCurrentPage((prev) => Math.max(prev - 1, 1))
                        }
                        disabled={currentPage === 1}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50"
                      >
                        Previous
                      </button>
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                        (page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 border rounded-lg ${
                              currentPage === page
                                ? "bg-blue-500 text-white"
                                : "bg-white"
                            }`}
                          >
                            {page}
                          </button>
                        )
                      )}
                      <button
                        onClick={() =>
                          setCurrentPage((prev) =>
                            Math.min(prev + 1, totalPages)
                          )
                        }
                        disabled={currentPage === totalPages}
                        className="px-4 py-2 border rounded-lg disabled:opacity-50"
                      >
                        Next
                      </button>
                    </div>
                  </div>
                )}
              </>
            ) : (
              <div className="bg-white p-8 rounded-lg shadow-md text-center">
                <p className="text-gray-500">
                  No candidates found matching your filters.
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
    </div>
  );
}

export default App;
