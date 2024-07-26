# Angular User Dashboard

This project demonstrates proficiency in Angular (7+) by creating an interactive user dashboard. The application employs advanced features like state management frameworks, directives, and observables. It also emphasizes proper styling, animations, and caching techniques. The Angular Material UI library is used for the design.

## Project Setup

### Prerequisites

- Node.js and npm (Node Package Manager)
- Angular CLI

### Installation

1. **Clone the repository**:
    ```bash
    git clone https://github.com/ajam997/angular-quiz-dashboard.git
    cd angular-quiz-dashboard
    ```

2. **Install the dependencies**:
    ```bash
    npm install
    ```

3. **Run the application**:
    ```bash
    ng serve
    ```

4. **Open your browser** and navigate to `http://localhost:4200`.

## Features

### Page Layout

- A header with a search field to search for users by ID.
- A horizontally centered, paginated users list.

### Data Retrieval

- Fetches user card data (including avatar image, first name, last name, and ID) from [ReqRes API](https://reqres.in/api/users?page={page}).
- Fetches details for a single user via [ReqRes API](https://reqres.in/api/users/{id}).

### Navigation

- Click functionality on user cards to navigate to a new page displaying detailed information about the selected user.

### Search Functionality

- An instant search field within the header to search for users by ID without requiring a separate button.
- Display search results and allow navigation to the user details page if the user exists.

### User Details Page

- A back button on each individual user's page to navigate back to the main user list.

### Caching Implementation

- Caching mechanisms to avoid redundant HTTP requests, optimizing the application's performance.

### User Experience Enhancements

- A loading bar to indicate pending network requests, ensuring a smoother user experience during data retrieval.

## State Management

- Utilizes NgRx for efficient state handling.
- Custom directives for improved UI interactions or functionalities.
- Observables from RxJS to manage asynchronous operations.

## Styling and Animations

- Uses Angular Material for UI components.
- Ensures proper styling and animations to enhance the user interface.

## File Structure

- `src/app/components/user-list/user-list.component.ts` - Displays the list of users.
- `src/app/components/user-detail/user-detail.component.ts` - Displays detailed information about a selected user.
- `src/app/services/user.service.ts` - Handles data fetching and caching.
- `src/app/app-routing.module.ts` - Defines routes for the application.

## Troubleshooting

### Common Issues

1. **Invalid value "auto" set as rowHeight**:
    Ensure you are using a valid value for `rowHeight` in `mat-grid-list`. Use `'fit'` or a specific value like `'100px'`.

2. **'mat-paginator' is not a known element**:
    Make sure you have imported `MatPaginatorModule` in your `AppModule`.

3. **Type 'Observable<User | undefined>' is not assignable to type 'Observable<User>'**:
    Ensure proper typing and handling of undefined values when fetching user data.

## Contributions

Contributions are welcome. Please create a pull request or open an issue for any improvements or bug fixes.

## License

This project is licensed under the MIT License.
