---
title: Custom React useFetch() hook for data fetching with revalidation
date: 2021-12-27
description: This guide is to show you how to create a simple react hook for data fetching (with revalidation).
repo: brimblehq/use-fetch
author: Damilola Jerugba
image: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/seuwkcxzixnlh23771xk.png
---

This guide is to show you how to create a simple react hook for data fetching (with revalidation).

## 🤨 Why this hook?

When fetching data for your react applications, you'd usually use both `useState` and `useEffect`, with values like `loading`, `data` and `error` e.g [This example](https://github.com/damiisdandy/use-pagination/blob/master/src/App.tsx), this hook is to help abstract that functionality into one simple hook that can be used anywhere and multiple times.

## 🕺 Setting up the project

We would be using the `create-react-app` boiler template for typescript and the only external library we would be using is `axios` for data fetching.

Open up your terminal and type in the following commands.

```
yarn create react-app use-fetch --template typescript
# for npm
npx create-react-app use-fetch --template typescript
```

Change into the directory and install `axios`

```
cd use-fetch
yarn add axios
# for npm
npm install axios
```

Within the `src` directory delete the following file (because they aren't needed)

- App.css
- App.test.tsx

## 🎣 Custom `useFetch` hook

Within the `src` directory create another directory called `hooks`, this is where our hook will reside.

```
cd src
mkdir hooks
```

Your file structure should look something like this.

![file structure](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3e1l0z0k8qi5nfsfj21m.png)

Within the `hooks` directory create a file called `useFetch.tsx`.

Type in the following inside the `useFetch` file.

```javascript
import { useState, useEffect, useCallback } from "react";
import axios from "axios";

interface UseFetchProps {
  url: string;
}

const useFetch = ({ url }: UseFetchProps) => {
  const [data, setData] = useState<any>();
  const [error, setError] = useState(false);

  // function to fetch data
  const fetch = useCallback(async () => {
    setError(false);
    try {
      const fetchedData = await axios.get(url);
      setData(fetchedData.data);
    } catch {
      setError(true);
    }
  }, [url]);

  useEffect(() => {
    // on first load fetch data
    fetch();
  }, [fetch]);

  return {
    data,
    error,
    revalidate: fetch,
  };
};

export default useFetch;
```

The hook takes in a prop `url`, which is the API url at which we want to fetch data from. It has two states `data` and `error` which are used to store data gotten from the API and check for errors respectively.

We created a separate function for fetching the data called `fetch` and wrapped it within a `useCallback` hook, Visit [here](https://www.geeksforgeeks.org/react-js-usecallback-hook/#:~:text=The%20useCallback%20hook%20is%20used,of%20the%20dependencies%20has%20changed.) to see the reason why we used a `useCallback` hook.

Then we simply used a `useEffect` hook to run the `fetch` function as soon as the hook is mounted 🙂.

The hook returns `data`, `error` and `revalidate` which is the `fetch` function for when we want to programmatically revalidate the data.

## 😎 Using the hook

To use the hook we simply just import it and extract its values.
Within the `App.tsx`

```javascript
import useFetch from './hooks/useFetch';
import logo from './logo.svg';

function App() {
  const { error, data, revalidate } = useFetch({
    url: 'https://random-data-api.com/api/users/random_user?size=5',
  });

  if (!data) {
    return <h2>Loading...</h2>;
  }

  if (error) {
    return <h2>Error fetching users</h2>;
  }

  return (
    <div className="App">
      <img src={logo} alt="react logo" />
      <h1 className="title">useFetch()</h1>
      <button onClick={revalidate}>revalidate</button>
      <div className="items">
        {data.map((el: any) => (
          <div className="item" key={el.uid}>
            <img
              src={`https://avatars.dicebear.com/api/big-smile/${el.first_name}.svg`}
              alt={`${el.username} profile`}
              className="item__img"
            />
            <div className="item__info">
              <p className="name">
                {el.first_name} {el.last_name}{' '}
                <span className="username">(@{el.username})</span>
              </p>
              <p className="job">{el.employment.title}</p>
              <p
                className={`status ${
                  el.subscription.status.toLowerCase() === 'active'
                    ? 'success'
                    : el.subscription.status.toLowerCase() === 'blocked'
                    ? 'danger'
                    : 'warn'
                }`}
              >
                {el.subscription.status}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
```

## ⏰ Adding Interval revalidation

You might need to fetch data from your API every 5 seconds for revalidation (ensuring your data is up-to-date).

We need to add some modifications to our `useFetch` hook. Lets and more props.

```javascript
interface UseFetchProps {
  url: string;
  revalidate?: boolean;
  interval?: number;
}
```

`revalidate` will be a boolean to check if we want to implement interval revalidation or not, `interval` will be the time taken between every revalidation (in seconds).

```typescript
...
const useFetch = ({ url, revalidate, interval }: UseFetchProps) => {
...
```

We'll create a state called `revalidateKey` that we will change on every interval which will be added to our `useEffect` dependency array. Adding this to our dependency array will ensure that the function within our `useEffect` will run everytime the `revalidateKey` changes.

To change the `revalidateKey`, we will create a new `useEffect` that has a `setInterval`.

```javascript
...
const [revalidateKey, setRevalidateKey] = useState("");
...
useEffect(() => {
    const revalidateInterval = setInterval(() => {
      if (revalidate) {
        setRevalidateKey(Math.random().toString());
      }
      // if no interval is given, use 3 seconds
    }, (interval ? interval : 3) * 1000);
    return () => clearInterval(revalidateInterval);
  }, [interval, revalidate]);
```

Our `useFetch` hook should then look something like this.

```javascript
const useFetch = ({ url, revalidate, interval }: UseFetchProps) => {
  const [revalidateKey, setRevalidateKey] = useState("");
  const [data, setData] = useState<any>();
  const [error, setError] = useState(false);

  // function to fetch data
  const fetch = useCallback(async () => {
    setError(false);
    try {
      const fetchedData = await axios.get(url);
      setData(fetchedData.data);
    } catch {
      setError(true);
    }
  }, [url]);

  useEffect(() => {
    const revalidateInterval = setInterval(() => {
      if (revalidate) {
        setRevalidateKey(Math.random().toString());
      }
      // if no interval is given, use 3 seconds
    }, (interval ? interval : 3) * 1000);
    return () => clearInterval(revalidateInterval);
  }, [interval, revalidate]);

  useEffect(() => {
    // on first load fetch data and when revalidateKey changes
    fetch();
  }, [fetch, revalidateKey]);

  return {
    data,
    error,
    revalidate: fetch,
  };
};
```

Using the `useFetch` hook ✨

```javascript
const { error, data, revalidate } = useFetch({
  url: 'https://random-data-api.com/api/users/random_user?size=5',
  revalidate: false,
  // fetch every 5 seconds
  interval: 5,
});
```

### ⚠️ Graphql support

This hook uses only the `GET` method, and Graphql uses `POST` method for [data fetching](https://medium.com/@stubailo/how-to-call-a-graphql-server-with-axios-337a94ad6cf9). To make the hook more dynamic you can add more props like `isGraphql` and `query`, `isGraphql` will be a boolean to check if its Graphql or REST so you can have a condition in your hook to use `axios.post()` instead of `axios.get()` and `query` for the graphql query.

Thank you for reading 🙏🏾, If you have any questions, additions, or subtractions please comment below.

The full source code is linked below 👇👇
