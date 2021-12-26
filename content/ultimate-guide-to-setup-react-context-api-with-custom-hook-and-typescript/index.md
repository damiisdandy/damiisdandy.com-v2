---
title: Ultimate Guide to setup React Context API with a custom hook [Typescript]
date: 2021-09-30
description: This is a guide to help you set up React Context API with typescript.
repo: damiisdandy/context-api-typescript
author: Damilola Jerugba
image: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/g8q4en8rdif020w5fx2p.jpg
---

This is a guide to help you set up React Context API with typescript.

## 🤨 What is React Context API?

Context is designed to share data that can be considered “global” for a tree of React components, This prevents [Prop drilling](https://kentcdodds.com/blog/prop-drilling) and allows you to pass data around your react component tree efficiently.

There are external libraries like [Redux](https://kentcdodds.com/blog/prop-drilling) that help with this, but luckily react implemented a built-in feature called [React Context API](https://reactjs.org/docs/context.html) that does this perfectly.

Let's dive in! 😁

## Setup 🛠

To set up the project we need to first create a `create-react-app` application with the typescript template, To do this open up a terminal window and run the command

```
npx create-react-app context-typescript --template typescript

# or

yarn create react-app context-typescript --template typescript
```

Open the `context-typescript` directory in your favorite text editor like VS code and delete the following files within the `src` directory.

- `App.css`
- `App.test.tsx`

or simply run the commands

```
cd context-typescript/src
rm App.css App.test.tsx
```

Then open up the `App.tsx` file, clear everything within it and copy the following lines of code inside it.

```javascript
// src/App.tsx

import logo from './logo.svg';

function App() {
  return <div></div>;
}

export default App;
```

## Declaring the Interfaces and types we'll use 🧩

Within the `react-app-env.d.ts` file we'll declare the [Interface](https://www.typescriptlang.org/docs/handbook/2/objects.html) for our global state, We will be building a To-do application in this example to illustrate the use of the context API.

```javascript
// react-app-env.d.ts

interface Todo {
  id: number;
  title: string;
  isCompleted: Boolean;
  createdAt: Date;
}
interface State {
  isDark: boolean;
  todos: Todo[];
}
```

## Creating Our Context 🌴

Create a folder in the `src` directory called `context` within it create two files called `index.tsx` and `reducer.ts`.

or run the commands

```
mkdir src/context

cd src/context

touch index.tsx reducer.ts
```

Within the `index.tsx` we'll create our context, global context provider, and our custom hook. In the `reducer.ts` we'll create our reducer function.

Open up the `index.tsx` type the following

```javascript
// src/context/index.tsx

import {
  createContext,
  Dispatch,
  ReactNode,
  useContext,
  useReducer,
} from 'react';

// Initial State
const initialState: State = {
  isDark: false,
  todos: [
    {
      id: 0,
      title: 'Prepare dev.to article ✍',
      createdAt: new Date('2021-09-28T12:00:00-06:30'),
      isCompleted: false,
    },
    {
      id: 2,
      title: 'Watch season 3 episode 2 of Attack on titans 👀',
      createdAt: new Date('2021-09-30T11:00:00-06:30'),
      isCompleted: false,
    },
  ],
};
```

We simply just imported all that we'll be using in the file and initiated our initial state. Notice how we used the `State` interface.

Before we create our Context let's first declare the `Interface` and `type` we'll be using for our context.

Within the `react-app-env.d.ts` file add the following lines of code.

```javascript
// react-app-env.d.ts

...
type ActionTypes = 'TOGGLE_MODE' | 'ADD_TODO' | 'REMOVE_TODO' | 'MARK_AS_DONE';

interface Action {
    type: ActionTypes;
    payload?: any;
}
```

We've just declared the `Action` interface and its respective types (`ActionTypes`)

Now we can create our context, Add the following lines of code underneath the initial state we just declared in the `index.tsx`

```javascript
// src/context/index.tsx

...
// Create Our context
const globalContext = createContext<{
  state: State;
  dispatch: Dispatch<Action>;
}>({
  state: initialState,
  dispatch: () => {},
});
```

We've already imported the `createContext` function and `Dispatch` interface, we also implemented our `Action` interface, and set the initial state to our `initialState`

## Creating the Reducer 📦

Before we create the reducer function lets the `Type` for our reducer function within the `react-app-env.d.ts` file

```javascript
// react-app-env.d.ts
...

type ReducerType = (state: State, action: Action) => State;
```

This is simply a function that takes in the `State` and `Action` and returns the `State`.

Within the `reducer.ts` file, copy the function below.

```javascript
// src/context/reducer.ts

const reducer: ReducerType = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_MODE':
      return { ...state, isDark: !state.isDark };
    case 'ADD_TODO':
      const mostRecentTodos = state.todos.sort((a, b) => b.id - a.id);
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            // generate it's id based on the most recent todo
            id: mostRecentTodos.length > 0 ? mostRecentTodos[0].id + 1 : 0,
            title: action.payload,
            isCompleted: false,
            createdAt: new Date(),
          },
        ],
      };
    case 'REMOVE_TODO':
      return {
        ...state,
        todos: state.todos.filter(el => el.id !== action.payload),
      };
    case 'MARK_AS_DONE':
      const selectedTodo = state.todos.find(el => el.id === action.payload);
      if (selectedTodo) {
        return {
          ...state,
          todos: [
            ...state.todos.filter(el => el.id !== action.payload),
            {
              ...selectedTodo,
              isCompleted: true,
            },
          ],
        };
      } else {
        return state;
      }
    default:
      return state;
  }
};

export default reducer;
```

Based on the `ActionTypes` type we previously initialized, we are using for the `switch` statement's `action.type`

Because we are using Typescript our text editor or IDE helps us with IntelliSense for the action types.

![typescript intelliSense](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/q36917so0a8ri7u5uhfz.png)

## Creating the Global Provider 🌐

Within the `index.tsx` file we'll import the reducer function we just created.

```javascript
// src/context/index.tsx
...
import reducer from "./reducer";
...
```

Then we'll create the global provider that we'll wrap around our root component

```javascript
// src/context/index.tsx

...
// Provider to wrap around our root react component
export const GlobalContextProvider = ({
  children,
}: {
  children: ReactNode;
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <globalContext.Provider
      value={{
        state,
        dispatch,
      }}
    >
      {children}
    </globalContext.Provider>
  );
};
```

We've previously imported `ReactNode` and `useReducer`.
The `Provider` property is gotten from our previously created `globalContext`, We also added in the parameters `reducer` and `initialState` inside the `useReducer` hook, _(psst! picture `useReduer` as `useState` on steroids 💪)_. The `children` prop is simply the direct child component of `GlobalContextProvider` (our entire app).

Now we simply just wrap the `GlobalContextProvider` around our root component within the `src/index.tsx` file

Your code should look like this

```javascript
// src/index.tsx

import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { GlobalContextProvider } from './context';

ReactDOM.render(
  <React.StrictMode>
    <GlobalContextProvider>
      <App />
    </GlobalContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
```

## Custom Hook 📎

We are going to create a hook that lets us access our global state and dispatch function anywhere in our component tree (react app).

Before we do that let's create its `Type`, this is useful because it lets us use the power of Typescript.

We'll declare this within the `react-app-env.d.ts` file like we always have.

```javascript
// react-app-env.d.ts

...
type ContextHook = () => {
    state: State,
    dispatch: (action: Action) => void;
}
```

This is a function that simply returns an object that contains our global state and dispatch function.

Now we create the hook within the `src/context/index.tsx` file

```javascript
// src/context/index.tsx

...
// Custom context hook
export const useGlobalContext: ContextHook = () => {
  const { state, dispatch } = useContext(globalContext);
  return { state, dispatch };
};
```

We previously imported the `useContext` hook, which takes in our `globalContext`.

## Using our custom hook

Within the `App.tsx` file we'll import the `useGlobalContext` hook we just created.

```javascript
// src/App.tsx

import logo from './logo.svg';
import { useGlobalContext } from './context';

function App() {
  const { state, dispatch } = useGlobalContext();
  return <div></div>;
}

export default App;
```

With the power of typescript, we have IntelliSense to help us out.

![typescript intelliSense](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/6nti2onhratkysign8l5.png)

![typescript intelliSense](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/1kzx1z33eoomnurisjxy.png)

That's all for this tutorial 🎉, This is my first article 😅, feedback will be nice, Be sure to comment down below if you have any questions, additions, or subtractions.

The full source code to with project with a functioning todo application is linked below 👇👇
