# Candidate Portfolio Dashboard

## Overview

The Candidate Portfolio Dashboard is an internal HR tool designed to help recruiters organize, view, and filter developer candidate profiles all in one place. This lightweight application allows you to:

- Store candidate information including GitHub/LinkedIn profiles
- Track tech stacks and experience levels
- Quickly filter and sort candidates
- Export candidate data to CSV

## Features

### Candidate Management

- **Add new candidates** with:
  - Full name
  - Job role/position
  - LinkedIn and GitHub URLs
  - Experience level (Junior/Mid/Senior)
  - Tech stack (multiple tags)

### Dashboard View

- **Card-based layout** for easy scanning
- **Quick links** to LinkedIn and GitHub profiles
- **Visual badges** for experience levels
- **Tech stack chips** for at-a-glance skills assessment

### Powerful Filtering

- Filter by:
  - Job role
  - Experience level
  - Tech stack tags
- Sort by:
  - Name (A-Z)
  - Experience level (Junior → Senior)

### Other Features

- **Click any candidate** to view full details in a modal
- **Pagination** for large candidate lists
- **Export to CSV** functionality for easy data sharing

## Getting Started

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/BongominErickJuma/Candidate-Portfolio-Dashboard
   cd candidate-portfolio-dashboard
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage Guide

### Adding Candidates

1. Fill out the form on the left side of the dashboard
2. Provide all required information
3. For tech stack:
   - Select from predefined options or
   - Type custom technologies and click "Add"
4. Click "Add Candidate" to submit

### Viewing Candidates

- All candidates appear in the main dashboard area
- Click any candidate card to view full details in a modal
- Use the LinkedIn and GitHub icons to visit profiles

### Filtering and Sorting

1. Use the "Filters & Sorting" panel at the top of the dashboard
2. Select sorting preference (Name or Experience)
3. Enter filters as needed:
   - Type in the role field to filter by job title
   - Select experience level from dropdown
   - Choose specific tech stack to filter by

### Exporting Data

1. Apply any desired filters
2. Click the "Export to CSV" button
3. A CSV file will download with all currently filtered candidates

## Data Persistence

All candidate data is stored in your browser's local storage. This means:

- Data persists between sessions
- Data is specific to your browser/device
- To share data, use the CSV export feature

## Troubleshooting

### Data Not Saving

- Ensure you're using the same browser where you added candidates
- Check if browser settings block local storage
- Try clearing cache and reloading the application

### Export Issues

- Make sure you have candidates in the current filtered view
- Check browser settings for download permissions
- Try a different browser if issues persist

## Built With

- [React](https://reactjs.org/) - JavaScript library
- [Vite](https://vitejs.dev/) - Build tool
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - Data persistence

## Future Enhancements

- User authentication
- Cloud storage integration
- Bulk import functionality
- Advanced analytics
- Team collaboration features

## Contributing

Contributions are welcome! Please fork the repository and submit a pull request with your improvements.
