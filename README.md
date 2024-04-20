# Recipe Organizer App

This recipe Organizer app allows users to easily organize and access their favorite recipes. Built with the latest Angular and Tailwind CSS, it offers a modern and responsive user interface. Firebase provides a powerful backend for data storage and retrieval.

## Key Features

- **Manage Recipes:** Add, update, and delete recipes seamlessly through a user-friendly interface.
- **Search Functionality:** Users can search for recipes using keywords to find exactly what they need.
- **Sorting and Filtering:** Refine search results based on criteria such as category and cooking time.
- **Detailed Recipe View:** Each recipe includes detailed information such as ingredients, cooking time, and instructions.
- **Easy Navigation:** Effortlessly navigate between the search results and detailed recipe views.
- **Responsive UI:** An intuitive and fully responsive design ensures a great user experience on various screen sizes and devices.
- **Firebase Integration:** Utilizes Firebase for efficient fetching and storing of recipe data.

## Technical Architecture

The recipe organizer is built using Angular.  Angular's component-based architecture ensures that the app is modular, making it both scalable and easy to maintain. Key components include the recipe component, recipe form component, and recipe-details component. Angular's built-in validators within reactive forms are used to check the validity of input fields. Tailwind CSS is used to style the components of the app. For backend operations, the app uses Firebase. It provides a real-time database solution that enables seamless data synchronization across the app.

## How to run it locally?

To set up the project locally, follow these steps:

1. Clone the repository:<br>
   `git clone https://github.com/your-username/recipe-organizer.git`
   
3. Navigate to the project directory:<br>
   `cd recipe-app`
   
5. Install dependencies:<br>
  `npm install`

7. Start the dev server by running the command below. Navigate to http://localhost:4200/.
   `ng serve`

