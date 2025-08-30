import { FaLinkedin, FaGithub, FaUser, FaBriefcase } from "react-icons/fa";

const CandidateCard = ({ candidate, onClick }) => {
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
    <div
      className="group relative bg-white rounded-3xl p-6 cursor-pointer transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl border border-gray-100 overflow-hidden"
      onClick={() => onClick(candidate)}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-3xl"></div>
      
      {/* Header with avatar and experience badge */}
      <div className="relative z-10 flex items-start justify-between mb-6">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300">
              <FaUser className="text-white text-xl" />
            </div>
            {/* Online indicator */}
            <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-lg"></div>
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="text-xl font-bold text-gray-900 mb-1 truncate group-hover:text-purple-700 transition-colors duration-300">
              {candidate.fullName}
            </h3>
            <div className="flex items-center text-gray-600 mb-2">
              <FaBriefcase className="mr-2 text-sm text-purple-500" />
              <p className="font-medium text-sm truncate">{candidate.jobRole}</p>
            </div>
          </div>
        </div>
        <span
          className={`px-3 py-1.5 rounded-2xl text-xs font-bold shadow-lg ${getExperienceClass()} flex-shrink-0`}
        >
          {getExperienceLabel()}
        </span>
      </div>

      {/* Skills preview */}
      <div className="relative z-10 mb-6">
        <div className="flex items-center justify-between mb-3">
          <h4 className="text-sm font-bold text-gray-700">Top Skills</h4>
          <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full font-medium">
            {candidate.techStack.length} skills
          </span>
        </div>
        <div className="flex flex-wrap gap-1.5">
          {candidate.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="bg-gradient-to-r from-purple-100 to-pink-100 text-purple-700 px-3 py-1.5 rounded-xl text-xs font-semibold border border-purple-200 hover:border-purple-300 transition-colors duration-200"
            >
              {tech}
            </span>
          ))}
          {candidate.techStack.length > 3 && (
            <span className="bg-gray-100 text-gray-600 px-3 py-1.5 rounded-xl text-xs font-semibold">
              +{candidate.techStack.length - 3}
            </span>
          )}
        </div>
      </div>

      {/* Footer with social links and CTA */}
      <div className="relative z-10 pt-4 border-t border-gray-100">
        <div className="flex items-center justify-between mb-3">
          <div className="flex space-x-2">
            <a
              href={candidate.linkedInUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-blue-500 flex items-center justify-center text-white hover:bg-blue-600 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <FaLinkedin className="text-sm" />
            </a>
            <a
              href={candidate.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-9 h-9 rounded-xl bg-gray-800 flex items-center justify-center text-white hover:bg-gray-900 transition-all duration-300 hover:scale-110 shadow-md hover:shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <FaGithub className="text-sm" />
            </a>
          </div>
          <div className="flex items-center space-x-1 text-purple-600 group-hover:text-purple-700 transition-colors duration-300">
            <span className="text-xs font-medium">View Details</span>
            <div className="w-4 h-4 rounded-full bg-purple-100 flex items-center justify-center group-hover:bg-purple-200 transition-colors duration-300">
              <svg className="w-2 h-2 fill-current" viewBox="0 0 8 8">
                <path d="M0 3h6L4 1v2h4v2H4v2L6 5H0z"/>
              </svg>
            </div>
          </div>
        </div>
        
        {/* Prominent View Profile Button */}
        <button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-3 px-4 rounded-xl font-semibold text-sm shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-[1.02] group-hover:from-purple-600 group-hover:to-pink-600 flex items-center justify-center space-x-2">
          <span>👁️ View Full Profile</span>
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 -z-0"></div>
      <div className="absolute bottom-4 left-4 w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20 group-hover:opacity-40 transition-opacity duration-300 -z-0"></div>
    </div>
  );
};

export default CandidateCard;
