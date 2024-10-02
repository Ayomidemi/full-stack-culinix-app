![individual recipe](https://github.com/user-attachments/assets/26e683d7-1818-43d2-a445-2cf43b6081e6)

# 🍽️ Culinix Recipe Sharing Platform

**Culinix** is a full-stack **MERN** (MongoDB, Express, React, Node.js) application that allows users to share, explore, and review unique recipes. Users can also manage their favorite recipes, interact with others via upvotes/downvotes and reviews, and receive notifications for recipe updates.

## 🚀 Features

### User Functionality:

- **User Registration & Login**: Secure authentication using JSON Web Tokens (JWT).
- **Recipe Exploration**: Users can browse top recipes, search for recipes, and view detailed recipe pages.
- **Recipe Interaction**:
  - Post, edit, and delete recipes (for registered users).
  - Upvote and downvote recipes.
  - Post and view reviews on recipes.
- **Favorite Recipes**: Registered users can mark recipes as favorites and view their favorite recipes.
- **User Profile**: View and update user profile information.
- **Recipe Management**: Users can add, modify, and delete their own recipes.

### Additional Features:

- **🔔 Notifications**: Users receive in-app or email notifications when:
  1. Their recipe gets a review.
  2. A favorite recipe of theirs is updated.
- **📂 Recipe Categories**: Users can create custom categories for organizing their favorite recipes.
- **🔍 Search & Pagination**: Search for recipes using keywords and ingredients, with pagination support.

### Extra Features:

- **👀 Recipe Views**: Track the number of times a recipe has been viewed.
- **🛠️ Ingredient-based Search**: Users can input a list of ingredients to find relevant recipes.

## 🌐 API Endpoints

### Authentication

- `POST /api/auth/register`: [Register](#) a new user.
- `POST /api/auth/login`: [Log in](#) with existing user credentials.

### Recipes

- `POST /api/recipes`: [Add](#) a new recipe.
- `PUT /api/recipes/:id`: [Modify](#) a recipe the user created.
- `DELETE /api/recipes/:id`: [Delete](#) a recipe the user created.
- `GET /api/recipes`: [Get all recipes](#).
- `GET /api/recipes/top`: [Get top recipes](#) with the most upvotes.
- `GET /api/recipes/:id`: [Get details](#) of a single recipe.
- `GET /api/recipes/search?query=`: [Search](#) for recipes (supports pagination).

### Favorites

- `GET /api/favorites`: [Get favorite recipes](#) of a logged-in user.
- `POST /api/favorites/:id`: [Add to favorites](#).
- `DELETE /api/favorites/:id`: [Remove from favorites](#).

### Reviews

- `POST /api/reviews/:recipeId`: [Post a review](#) for a recipe.

### Upvotes & Downvotes

- `POST /api/recipes/:id/upvote`: [Upvote](#) a recipe.
- `POST /api/recipes/:id/downvote`: [Downvote](#) a recipe.

## 🛠️ Tech Stack

### Design

- **Figma**: UI/UX design and prototyping. [Figma](https://www.figma.com/).

### Frontend

- **React**: The frontend is built using [React](https://react.dev/), offering a dynamic user interface.
- **SCSS**: A utility-first CSS framework is used for modern and responsive styling. [SCSS](https://sass.com/).
- **Axios**: For handling API requests.

### Backend

- **Node.js & Express**: Provides the backend logic and REST API endpoints. [Node.js](https://nodejs.org/), [Express](https://expressjs.com/).
- **MongoDB**: Stores user data, recipes, and reviews. [MongoDB](https://www.mongodb.com/).
- **Mongoose**: For MongoDB object modeling and data validation. [Mongoose](https://mongoosejs.com/).

### Authentication & Security

- **JSON Web Tokens (JWT)**: Secure authentication for users. [JWT](https://jwt.io/).

### Notifications

- In-app and email notifications for recipe reviews and updates using nodemailer (or a similar service). [Nodemailer](https://nodemailer.com/).

## 🔧 Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/Ayomidemi/culinix.git
   ```
2. Install server-side dependencies:
   ```bash
   cd server
   yarn install
   ```
3. Install client-side dependencies:
   ```bash
   cd client
   yarn install
   ```
4. Add environment variables:
   ```bash
   MONGO_URI=MONGO_URI
    JWT_SECRET=JWT_SECRET
    EMAIL_USER=EMAIL_USER
    EMAIL_PASS=EMAIL_PASS
   ```
5. Run the server and client:
   - Backend:
   ```bash
    cd server
    nodemon index.js
   ```
   - Frontend
   ```bash
    cd client
    yarn dev
   ```

## Happy Coding!
