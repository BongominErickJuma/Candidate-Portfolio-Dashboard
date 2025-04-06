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
    <div className="bg-white p-4 rounded-lg shadow-md mb-6">
      <h2 className="text-xl font-bold mb-4">Filters & Sorting</h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-gray-700 mb-2">Sort By</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="name">Name</option>
            <option value="experience">Experience Level</option>
          </select>
        </div>

        <div>
          <label className="block text-gray-700 mb-2">Filter by Role</label>
          <input
            type="text"
            value={filterRole}
            onChange={(e) => setFilterRole(e.target.value)}
            placeholder="Enter job role"
            className="w-full px-3 py-2 border rounded-lg"
          />
        </div>

        <div>
          <label className="block text-gray-700 mb-2">
            Filter by Experience
          </label>
          <select
            value={filterExperience}
            onChange={(e) => setFilterExperience(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg"
          >
            <option value="">All Levels</option>
            <option value="junior">Junior</option>
            <option value="mid">Mid-Level</option>
            <option value="senior">Senior</option>
          </select>
        </div>
      </div>

      <div className="mt-4">
        <label className="block text-gray-700 mb-2">Filter by Tech Stack</label>
        <select
          value={filterTech}
          onChange={(e) => setFilterTech(e.target.value)}
          className="w-full px-3 py-2 border rounded-lg"
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
  );
};

export default DashboardControls;
