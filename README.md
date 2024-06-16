# abn-amro

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Type-Check, Compile and Minify for Production

```sh
npm run build
```

### Run Unit Tests with [Vitest](https://vitest.dev/)

```sh
npm run test:unit
```

### Lint with [ESLint](https://eslint.org/)

```sh
npm run lint
```

## Technologies used

### Vue3 (composition API) + vite
As discussed during the introduction, it's the preferred JS framework for ABN-AMRO applications. Project was set up with `create-vue` which is the official Vue scaffolding tool. This also includes `vitest` for unit testing. And `vue-router` for routing.

### TailwindCSS
Tailwind is great for quickly writing inline CSS to get some basic styling without a large UI framework dependency. While great for prototyping and small applications, on a larger (corporate) scale I'd prefer an internal design system.

### Axios
Used for data fetching. The main reason for using it over `fetch` is the automatic JSON parsing.

### Eslint + Prettier
Industry standard code quality/formatting/linting tools. 

## Future optimizations

### Caching

React-query/Vue-query like tools would introduce caching tools minimizing the amount of requests to the same endpoint. 

### Error handling
Similarly, react-query/Vue-query like tools also provide util props like `isLoading` and `isError` for gracefully handling request states in the UI

### e2e testing
While unit tests are a good start, e2e  tests would further improve the stability of the application by testing the entire user flow.

### Improved routing
In this code the back button on the show detail page is implemented using `router.go(-1)`. This leads to unwanted side effects for example when the user navigates the page directly (or from an external page).

### UI jumping
When data is being rendered after the request is complete, the UI jumps around. Ideally, the UIs empty state should account for this. Which would prevent this issue.

