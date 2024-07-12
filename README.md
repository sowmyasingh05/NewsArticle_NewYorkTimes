# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

Dependencies - have installed Axios package for API calls.

npm install Axios
npm install @testing-library/react @testing-library/jest-dom


I have used Class component in react to develop this app application.

Articles are displayed in the form of list from the data fetched from Api Call made.
 
when user selects one particular article , it is shown in separate page with selected article details.

The user can navigate to the home page using back button.

The user can read full article using the read button this will navigate to the url shared from the datatbase for the particular article.

'npm run dev' will compile the whole application and show the application in the browser.

Explanation for TEST-CASE:
Mocking Axios: The axios.get method is mocked to simulate API responses.

Tests:

Loading State: Checks if the loading text is rendered initially.
Successful Fetch: Verifies that articles are displayed after a successful fetch.
Error Handling: Tests if an error message is displayed when the fetch fails.
Article Details: Ensures that article details are shown when an article is clicked.
Back to Articles: Confirms that clicking the back button returns to the article list.

'npm test' to run the test case