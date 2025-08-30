import { FaLinkedin, FaGithub, FaUser, FaBriefcase, FaTimes } from "react-icons/fa";

const CandidateModal = ({ candidate, onClose }) => {
  if (!candidate) return null;

  const getExperienceClass = () => {
    switch (candidate.experienceLevel) {
      case "junior":
        return "experience-badge-junior";
      case "mid":
        return "experience-badge-mid";
      case "senior":
        return "experience-badge-senior";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getExperienceLabel = () => {
    switch (candidate.experienceLevel) {
      case "junior":
        return "Junior";
      case "mid":
        return "Mid-Level";
      case "senior":
        return "Senior";
      default:
        return "";
    }
  };

  return (
    <div className="fixed inset-0 modal-backdrop flex items-center justify-center p-4 z-50 animate-fadeIn">
      <div className="card-modern rounded-2xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto relative animate-slideUp">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors duration-200 z-10"
        >
          <FaTimes className="text-gray-600" />
        </button>
        
        <div className="p-8">
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
              <FaUser className="text-white text-3xl" />
            </div>
            <h2 className="text-4xl font-bold text-gray-800 mb-2">{candidate.fullName}</h2>
            <div className="flex items-center justify-center text-gray-600 mb-4">
              <FaBriefcase className="mr-2" />
              <p className="text-xl font-medium">{candidate.jobRole}</p>
            </div>
            <span
              className={`inline-block px-4 py-2 rounded-full text-lg font-semibold shadow-lg ${getExperienceClass()}`}
            >
              {getExperienceLabel()}
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                  🔗 Professional Links
                </h3>
                <div className="space-y-4">
                  <a
                    href={candidate.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-blue-50 rounded-xl hover:bg-blue-100 transition-colors duration-200 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                      <FaLinkedin className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-blue-700">LinkedIn Profile</p>
                      <p className="text-blue-600 text-sm">View professional background</p>
                    </div>
                  </a>
                  
                  <a
                    href={candidate.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors duration-200 group"
                  >
                    <div className="w-12 h-12 rounded-full bg-gray-800 flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-200">
                      <FaGithub className="text-white text-xl" />
                    </div>
                    <div>
                      <p className="font-semibold text-gray-700">GitHub Profile</p>
                      <p className="text-gray-600 text-sm">Explore code repositories</p>
                    </div>
                  </a>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
                🛠️ Technical Skills
              </h3>
              <div className="flex flex-wrap gap-3">
                {candidate.techStack.map((tech, index) => (
                  <span
                    key={tech}
                    className="tech-badge text-gray-700 px-4 py-2 rounded-xl text-sm font-medium hover:scale-105 transition-transform duration-200"
                    style={{animationDelay: `${index * 0.1}s`}}
                  >
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-4 p-4 bg-purple-50 rounded-xl">
                <p className="text-purple-700 font-semibold">
                  Total Skills: {candidate.techStack.length}
                </p>
                <p className="text-purple-600 text-sm mt-1">
                  Diverse technology stack covering multiple domains
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default CandidateModal;
