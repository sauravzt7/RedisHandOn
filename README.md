# GitHub Search Application
This is a simple web application built with **Express.js**, **Axios**, **Redis**, and **GitHub REST API** that allows users to:
- Search for GitHub repositories.
- Search for GitHub issues.
- Search for GitHub users.

The application also employs **Redis caching** to store recently queried data temporarily, enhancing performance.
## Features
- **Search Repositories**: Enter a search term to find GitHub repositories matching the query.
- **Search Issues**: Fetch GitHub issues based on the provided query term.
- **Search Users**: Find GitHub users by username or search term.
- **Caching Using Redis**: Search results are cached for 60 seconds to minimize API calls to GitHub and improve performance.

## Technologies Used
- **Backend**: Node.js, Express.js
- **Frontend**: HTML, CSS, JavaScript
- **API Integration**: GitHub REST API
- **Caching**: Redis
- **HTTP Client**: Axios

## Prerequisites
Ensure the following are installed:
1. **Node.js** (v14+ recommended)
2. **npm** (comes installed with Node.js)
3. **Redis** (ensure the Redis service is running locally or accessible remotely)

## Setup Instructions
1. Clone the repository:
``` bash
   git clone <repository-url>
   cd <repository-folder>
```
1. Install dependencies:
``` bash
   npm install
```
1. Start the Redis server:
``` bash
   redis-server
```
1. Configure the constants (GitHub API base URL) if necessary. Open the file `common/constants.js`:
``` javascript
   module.exports = {
       GITHUB_SEARCH_REPOS_URL: "https://api.github.com/search/repositories?q=",
       GITHUB_SEARCH_ISSUES_URL: "https://api.github.com/search/issues?q=",
       GITHUB_SEARCH_USERS_URL: "https://api.github.com/search/users?q=",
   };
```
1. Start the server:
``` bash
   node index.js
```
1. Open your browser and navigate to:
``` 
   http://localhost:3000
```
## How It Works
1. The frontend has three buttons: **Search Repositories**, **Search Issues**, and **Search Users**. Users can type a search query in the input field and click the respective buttons.
2. Query Example:
    - **Search Repositories**: `http://localhost:3000/search-repos?query=<search-term>`
    - **Search Issues**: `http://localhost:3000/search-issues?query=<search-term>`
    - **Search Users**: `http://localhost:3000/search-users?query=<search-term>`

3. The backend:
    - Checks Redis for stored results.
    - If available, it returns cached data.
    - If not, it makes an API request to the GitHub REST API, stores the result in Redis, and then sends the response back to the frontend.

4. The frontend displays the results in a readable format, including:
    - Total repositories/issues/users found.
    - Time taken.
    - Data source (Redis cache or GitHub).

## Project Structure
``` plaintext
project-folder/
├── common/
│   ├── constants.js        # Contains constants like GitHub API URLs
│   ├── redisHandler.js     # Redis client and initialization logic
│   ├── utils.js            # Utility functions (e.g., time processing)
├── controller/
│   ├── SearchRepos.js      # Logic to handle repository searches and caching
├── public/                 # Frontend files
│   ├── index.html          # Main HTML file
│   ├── styles.css          # Styles
│   └── script.js           # Frontend JavaScript
├── index.js                # Main server file
├── package.json            # Dependencies and scripts
├── README.md               # Project documentation
```
## API Endpoints
1. **Search for Repositories**
    - Endpoint: `/search-repos`
    - Method: `GET`
    - Query Parameter: `query` (search term)
    - Example:
``` 
     GET /search-repos?query=example
```
1. **Search for Issues**
    - Endpoint: `/search-issues`
    - Method: `GET`
    - Query Parameter: `query` (search term)
    - Example:
``` 
     GET /search-issues?query=example
```
1. **Search for Users**
    - Endpoint: `/search-users`
    - Method: `GET`
    - Query Parameter: `query` (search term)
    - Example:
``` 
     GET /search-users?query=example
```
## Example Response
A successful `/search-repos` response looks like:
``` json
{
    "total_count": 5000,
    "seconds": 0.56,
    "source": "GITHUB_URL"
}
```
## Development
### Redis Configuration
The Redis client (`redisHandler.js`) connects to the default Redis server on `localhost:6379`. If your Redis instance requires custom configurations (e.g., different host/port), update the connection logic in `redisHandler.js`:
``` javascript
const redis = require("redis");
const redisClient = redis.createClient({
    host: "127.0.0.1",
    port: 6379,
});
```
## Improvements and To-Do
- Implement better error handling for edge cases (e.g., when GitHub or Redis services are unavailable).
- Add support for GitHub API authentication tokens to handle rate limits.
- Improve the frontend UI for better user experience.
- Add tests for both backend and frontend.

## Contributing
Feel free to fork and submit pull requests! Contributions are welcome. Ensure your code follows the existing style, and test your changes thoroughly.
## License
This project is licensed under the MIT License.
### Enjoy using the GitHub Search Application! 😊
