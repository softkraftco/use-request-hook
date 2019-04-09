# use-request-hook

> React hook for making API Requests

[![NPM](https://img.shields.io/npm/v/use-request-hook.svg)](https://www.npmjs.com/package/use-request-hook) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save use-request-hook
```

## Usage

```jsx
import React from 'react'
import axios from 'axios'
import {useRequest} from 'use-request-hook'

const api = axios.create({
  baseURL: 'http://localhost:3001/'
})

const normalizeData = ({data}) => data
const getPosts = (limit = 5) => api.get(`/posts?_limit=${limit}`).then(normalizeData)

const FetchPosts = () => {
  const { isLoading, data: posts = [] } = useRequest(getPosts, [])

  return (
    <div>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {(posts).map(post => (
            <p key={post.id}>{post.id} - {post.title}</p>
          ))}
        </div>
      )}
    </div>
  )
}
```

## Development

Start lib build

    yarn
    yarn start

Start example

    cd example
    yarn
    yarn start
  
### Start server

    git clone git@github.com:Selleo/react-developers-workshops-server.git
    cd react-developers-workshops-server
    yarn
    yarn start

## License

MIT © [tb](https://github.com/tb)
