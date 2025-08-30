import { FaFilter, FaSort, FaSearch } from "react-icons/fa";

const DashboardControls = ({
  sortBy,
  setSortBy,
  filterRole,
  setFilterRole,
  filterExperience,
  setFilterExperience,
  filterTech,
  setFilterTech,
  techOptions,
}) => {
  return (
    <div className="card-modern p-6 rounded-2xl mb-8 animate-slideUp">
      <div className="flex items-center mb-6">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center mr-3">
          <FaFilter className="text-white" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800">Filters & Sorting</h2>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div>
          <label className="flex items-center text-gray-700 font-semibold mb-3">
            <FaSort className="mr-2 text-purple-500" />
            Sort By
          </label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="input-modern w-full px-4 py-3 rounded-xl outline-none appearance-none cursor-pointer"
          >
            <option value="name">👤 Name</option>
            <option value="experience">⭐ Experience Level</option>
          </select>
        </div>

        <div>
          <label className="flex items-center text-gray-700 font-semibold mb-3">
            <FaSearch className="mr-2 text-purple-500" />
            Filter by Role
          </label>
          <input
            type="text"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            placeholder="Search job roles..."
            className="input-modern w-full px-4 py-3 rounded-xl outline-none placeholder-gray-500"
          />
        </div>

        <div>
          <label className="flex items-center text-gray-700 font-semibold mb-3">
            ⭐ Experience Level
          </label>
          <select
            value={filterExperience}
            onChange={(e) => setFilterExperience(e.target.value)}
            className="input-modern w-full px-4 py-3 rounded-xl outline-none appearance-none cursor-pointer"
          >
            <option value="">All Levels</option>
            <option value="junior">🌱 Junior</option>
            <option value="mid">🚀 Mid-Level</option>
            <option value="senior">⚡ Senior</option>
          </select>
        </div>

        <div>
          <label className="flex items-center text-gray-700 font-semibold mb-3">
            🛠️ Technology
          </label>
          <select
            value={filterTech}
            onChange={(e) => setFilterTech(e.target.value)}
            className="input-modern w-full px-4 py-3 rounded-xl outline-none appearance-none cursor-pointer"
          >
            <option value="">All Technologies</option>
            {techOptions.map((tech) => (
              <option key={tech} value={tech}>
                {tech}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DashboardControls;
