Movie List ApplicationThis Next.js application displays a paginated list of movies, filtered to show only those released within the last month.  It fetches data from The Movie Database (TMDb) API, stores a subset of the data locally, and provides a search-by-title feature.FeaturesMovie Listing: Displays a list of movies with their poster, title, and a brief overview.Last Month Only: Filters movies to show only those released in the previous calendar month.Pagination: Implements pagination to navigate through large lists of movies.Search by Title: Allows users to search for movies by their title.Local Data Storage: Fetches movie data from TMDb and stores a subset locally for efficient access.Technologies UsedNext.jsReactThe Movie Database (TMDb) APIaxiosSetupClone the repository: git clone git@github.com:MatinSoft/movie-list.git
cd movie-list
Install dependencies:npm install
# or
yarn install
Set up environment variables:Create a file named .env.local in the root of the project.Add the following environment variables, replacing the placeholders with your actual values:BASE_URL=https://api.themoviedb.org/3
API_KEY=YOUR_TMDB_API_KEY
Note: You can obtain an API key from The Movie Database (TMDb).Run the application:npm run dev
# or
yarn dev
The application will be accessible at http://localhost:3000 HandlingInitial Data Fetch:The application fetches movie data from the TMDb API's /discover/movie endpoint.It filters the results to include only movies with a release date within the previous calendar month.Local Data Storage:The fetched movie data (including poster path, title, overview, and release date) is stored in a JSON file (data/last_month_movies.json) within the project.Subsequent requests for movie data are served from this local JSON file for improved performance and reduced API calls.Data Updates:The application includes the logic to update the local JSON file with the latest movies from the previous month.Important: The application does not automatically update the local data on every page load.  You should manage the update process.  Consider these options:Manual Update: You can add a script or command to your package.json to re-fetch and save the data.Build-time Update: If the data doesn't change frequently, you can update the data during your build process.Scheduled Updates: For more dynamic data, you can use a scheduled task (e.g., a cron job or a serverless function) to periodically update the local data.API EndpointThe application uses the following TMDb API endpoint:GET /discover/movie:  See the TMDb API documentation for more details.Directory 

```
Structure├── 
data/                           # Directory for local data storage (e.g., last_month_movies.json)
├── app/                        # Next.js pages
│   └── page.tsx                # Main page displaying the movie list
├── utils/                      # Utility functions
│   └── movieData.js            # Functions for fetching, filtering, and saving movie data
├── .env.local                  # Environment variables (API key)
├── package.json
└── README.md                   # This file
```
Important NotesAPI Key Security: Ensure your TMDb API key is kept secure.  Do not commit it directly to your repository.  Use environment variables as shown in the setup instructions.Data Update Frequency: The local movie data is not updated automatically on every page load.  You'll need to implement a strategy for updating this data (see "Data Updates" above) to keep it current.  Choose an update frequency that balances data freshness with TMDb API usage.Error Handling: The application includes basic error handling, but you may want to expand on this.