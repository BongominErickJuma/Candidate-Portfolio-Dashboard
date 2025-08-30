import { useState } from "react";
import { FaUser, FaBriefcase, FaLinkedin, FaGithub, FaPlus, FaTimes } from "react-icons/fa";
import { EXPERIENCE_LEVELS, TECH_STACK_OPTIONS } from "../utils/constants";

const CandidateForm = ({ onAddCandidate, onClose }) => {
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

  const handleRemoveTech = (techToRemove) => {
    setSelectedTech(selectedTech.filter((tech) => tech !== techToRemove));
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
    <div className="card-modern p-8 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slideUp relative">
      <button
        onClick={onClose}
        className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 z-10"
      >
        <FaTimes className="text-gray-600" />
      </button>
      
      <div className="text-center mb-8">
        <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
          <FaUser className="text-white text-2xl" />
        </div>
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Add New Candidate</h2>
        <p className="text-gray-600">Discover your next amazing team member</p>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="space-y-6">
          <div className="w-full">
            <label className="block text-gray-700 font-semibold mb-3" htmlFor="fullName">
              <FaUser className="inline mr-2 text-purple-500" />
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className="input-modern w-full px-4 py-3 rounded-xl outline-none placeholder-gray-500"
              placeholder="Enter candidate's full name"
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-gray-700 font-semibold mb-3" htmlFor="jobRole">
              <FaBriefcase className="inline mr-2 text-purple-500" />
              Job Role/Position
            </label>
            <input
              type="text"
              id="jobRole"
              name="jobRole"
              value={formData.jobRole}
              onChange={handleChange}
              className="input-modern w-full px-4 py-3 rounded-xl outline-none placeholder-gray-500"
              placeholder="e.g., Frontend Developer, Full Stack Engineer"
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-gray-700 font-semibold mb-3" htmlFor="linkedInUrl">
              <FaLinkedin className="inline mr-2 text-blue-500" />
              LinkedIn URL
            </label>
            <input
              type="url"
              id="linkedInUrl"
              name="linkedInUrl"
              value={formData.linkedInUrl}
              onChange={handleChange}
              className="input-modern w-full px-4 py-3 rounded-xl outline-none placeholder-gray-500"
              placeholder="https://linkedin.com/in/username"
              required
            />
          </div>

          <div className="w-full">
            <label className="block text-gray-700 font-semibold mb-3" htmlFor="githubUrl">
              <FaGithub className="inline mr-2 text-gray-800" />
              GitHub URL
            </label>
            <input
              type="url"
              id="githubUrl"
              name="githubUrl"
              value={formData.githubUrl}
              onChange={handleChange}
              className="input-modern w-full px-4 py-3 rounded-xl outline-none placeholder-gray-500"
              placeholder="https://github.com/username"
              required
            />
          </div>

          <div className="w-full">
            <label
              className="block text-gray-700 font-semibold mb-3"
              htmlFor="experienceLevel"
            >
              ⭐ Experience Level
            </label>
            <select
              id="experienceLevel"
              name="experienceLevel"
              value={formData.experienceLevel}
              onChange={handleChange}
              className="input-modern w-full px-4 py-3 rounded-xl outline-none appearance-none cursor-pointer"
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

          <div className="w-full">
            <label className="block text-gray-700 font-semibold mb-3">🛠️ Tech Stack</label>
            
            {selectedTech.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-4 p-4 bg-gray-50 rounded-xl">
                {selectedTech.map((tech) => (
                  <span
                    key={tech}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-3 py-2 rounded-full text-sm flex items-center font-medium shadow-lg"
                  >
                    {tech}
                    <button
                      type="button"
                      onClick={() => handleRemoveTech(tech)}
                      className="ml-2 hover:bg-white/20 rounded-full p-1 transition-colors duration-200"
                    >
                      <FaTimes className="text-xs" />
                    </button>
                  </span>
                ))}
              </div>
            )}
            
            <div className="flex w-full mb-4">
              <input
                type="text"
                value={techInput}
                onChange={(e) => setTechInput(e.target.value)}
                placeholder="Add custom technology"
                className="input-modern flex-1 px-4 py-3 rounded-l-xl outline-none"
                onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddCustomTech())}
              />
              <button
                type="button"
                onClick={handleAddCustomTech}
                className="btn-accent text-white px-6 py-3 rounded-r-xl font-semibold hover:scale-105 transition-transform duration-200"
              >
                <FaPlus />
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-2">
              {TECH_STACK_OPTIONS.map((tech) => (
                <button
                  type="button"
                  key={tech}
                  onClick={() => handleTechStackChange(tech)}
                  className={`px-3 py-2 text-sm rounded-lg transition-all duration-300 font-medium ${
                    selectedTech.includes(tech)
                      ? "bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-lg scale-105"
                      : "tech-badge text-gray-700 hover:scale-105"
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
          className="btn-secondary text-white px-8 py-4 rounded-xl font-bold text-lg mt-8 w-full transition-all duration-300 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed shadow-xl"
        >
          ✨ Add Candidate to Portfolio
        </button>
      </form>
    </div>
  );
};

export default CandidateForm;
