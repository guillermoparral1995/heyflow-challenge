## JSON Explorer Challenge

#### Introduction

This solution is centered around the `JSONExplorer` component, which mainly consists of an input and a `JSONViewer` component. The input allows you to get the value of the JSON from the path specified as described in the task description.

The `JSONViewer` component's behaviour is mostly driven by the recursively-defined `renderJson` function. This function starts from the root of the JSON passed as a prop and then traverses it recursively, and depending on the type of the current node, renders different things: if it's a leaf node, will just render a `span` with its value, if it's an Array it will render the brackets and it's inner values and if it's an object, it will add the curly brackets, add the click handler for each of its keys and continue traversing its inner fields.

In order to parse and build the path to render it on the input, and to get the correct value from the JSON, I introduced a couple of util functions. The way they work is best described in the comments in `./src/utils/index.ts`.

Lastly, in order to test different JSON files, I added at the `App` component a textarea which accepts a JSON string that then is passed down to the `JSONExplorer` component as a prop as specified in the assignment.


#### Stack

For this challenge I set up a small React application with Vite, since it's very configurable while also easy and quick to use. For a dev environment, Vite has hot-module-replacement which is very convenient to see updates quickly while you're developing. Vite also introduces several optimisations for a production setup right out of the box, like chunk-splitting, tree-shaking and lazy-loading

I integrated it with Tailwind CSS for styles, due to the convenience of using utility-first classes instead of defining your own classes and assigning arbitrary values to different elements while worrying about polluting your global CSS, since Tailwind classes apply only locally. Tailwind is also built to only generate CSS from the clasess you use so there's no risk of generating unused CSS.

Lastly, I used Jest + React Testing Library for creating a couple of snapshot and unit tests for the implemented components, since they proved to be the most reliable tools for testing React components without focusing intensively on the implementation but rather on how a user interacts with said components.

#### Installation and setup

```
npm i
npm run dev
```

#### Tests

```
npm run test
```