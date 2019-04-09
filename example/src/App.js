import React, {useState} from 'react'

import axios from 'axios'
import {useRequest} from 'use-request-hook'

const api = axios.create({
  baseURL: 'http://localhost:3001/'
})

const normalizeData = ({data}) => data
const getPost = (id) => api.get(`/posts/${id}`).then(normalizeData)
const getPosts = (limit) => api.get(`/posts?_limit=${limit}`).then(normalizeData)

const FetchPost = () => {
  const [postId, setPostId] = useState('1')
  const { isLoading, data: post = {}, error } = useRequest(() => getPost(postId), [postId])
  const [postTitle, setPostTitle] = useState('')

  return (
    <div>
      <label>
        Post ID:
        <input value={postId} onChange={({target}) => setPostId(target.value)} />
      </label>
      {error && <div>Error: {JSON.stringify(error.response)}</div>}
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <form>
          {postId && post && (
            <label key={post.id}>
              Post#{post.id}
              <input
                name='title'
                style={{width: '500px'}}
                value={postTitle || post.title}
                onChange={({target}) => setPostTitle(target.value)}
              />
            </label>
          )}
        </form>
      )}
    </div>
  )
}

const FetchPosts = () => {
  const { isLoading, data: posts = [], request: fetchPosts } = useRequest(getPosts)
  const handleLoadData = () => fetchPosts(5)

  return (
    <div>
      <button onClick={handleLoadData}>Load data</button>
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

export default () =>
  <div>
    <FetchPost />
    <FetchPosts />
  </div>
