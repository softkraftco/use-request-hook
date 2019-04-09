import { useState, useEffect } from 'react'

export const useRequest = (
  fn,
  resolveInputs = null
) => {
  const resolve = resolveInputs != null
  const [data, setData] = useState()
  const [isLoading, setLoading] = useState(resolve)
  const [lastUpdated, setLastUpdated] = useState()
  const [error, setError] = useState()

  const request = (...args) => {
    setLoading(true)
    setError(null)

    return fn(...args)
      .then(result => {
        setData(result)
        setLastUpdated(Date.now())
      })
      .catch(err => {
        setError(err)
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    if (resolve) {
      request()
    }
  }, resolveInputs)

  return {
    request,
    data,
    isLoading,
    lastUpdated,
    error
  }
}
