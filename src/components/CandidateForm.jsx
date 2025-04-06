import { useState } from "react";
import { EXPERIENCE_LEVELS, TECH_STACK_OPTIONS } from "../utils/constants";

const CandidateForm = ({ onAddCandidate }) => {
  const [formData, setFormData] = useState({
    fullName: "",
    jobRole: "",
    linkedInUrl: "",
    githubUrl: "",
    experienceLevel: "",
    techStack: [],
  });

  const [selectedTech, setSelectedTech] = useState([]);
  const [techInput, setTechInput] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTechStackChange = (tech) => {
    if (selectedTech.includes(tech)) {
      setSelectedTech(selectedTech.filter((t) => t !== tech));
    } else {
      setSelectedTech([...selectedTech, tech]);
    }
  };

  const handleAddCustomTech = () => {
    if (techInput.trim() && !selectedTech.includes(techInput.trim())) {
      setSelectedTech([...selectedTech, techInput.trim()]);
      setTechInput("");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const candidate = {
      ...formData,
      techStack: selectedTech,
      id: Date.now().toString(),
    };
    onAddCandidate(candidate);
    setFormData({
      fullName: "",
      jobRole: "",
      linkedInUrl: "",
      githubUrl: "",
      experienceLevel: "",
      techStack: [],
    });
    setSelectedTech([]);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Add New Candidate</h2>
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="fullName">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="jobRole">
              Job Role/Position
            </label>
            <input
              type="text"
              id="jobRole"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="linkedInUrl">
              LinkedIn URL
            </label>
            <input
              type="url"
              id="linkedInUrl"
              name="linkedInUrl"
              value={formData.linkedInUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="githubUrl">
              GitHub URL
            </label>
            <input
              type="url"
              id="githubUrl"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2"
              htmlFor="experienceLevel"
            >
              Experience Level
            </label>
            <select
              id="experienceLevel"
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-lg"
              required
            >
              <option value="">Select Experience Level</option>
              {EXPERIENCE_LEVELS.map((level) => (
                <option key={level.value} value={level.value}>
                  {level.label}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Tech Stack</label>
            <div className="flex flex-wrap gap-2 mb-2">
              {selectedTech.map((tech) => (
                <span
                  key={tech}
                  className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full text-xs"
                >
                  {tech}
                </span>
              ))}
            </div>
            <div className="flex">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Add custom tech"
                className="flex-1 px-3 py-2 border rounded-l-lg"
              />
              <button
                type="button"
                onClick={handleAddCustomTech}
                className="bg-blue-500 text-white px-3 py-2 rounded-r-lg hover:bg-blue-600"
              >
                Add
              </button>
            </div>
            <div className="mt-2 flex flex-wrap gap-2">
              {TECH_STACK_OPTIONS.map((tech) => (
                <button
                  type="button"
                  key={tech}
                  onClick={() => handleTechStackChange(tech)}
                  className={`px-2 py-1 text-xs rounded-full ${
                    selectedTech.includes(tech)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {tech}
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          type="submit"
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 mt-4"
        >
          Add Candidate
        </button>
      </form>
    </div>
  );
};

export default CandidateForm;
