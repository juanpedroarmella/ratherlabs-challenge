import axios, { AxiosError, AxiosResponse } from 'axios'
import { useEffect, useState } from 'react'

interface UseFetchReturn<T> {
  data: T | null
  isLoading: boolean
  error: AxiosError | null
}

const useFetch = <T,>(apiUrl: string): UseFetchReturn<T> => {
  const [data, setData] = useState<T | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<AxiosError | null>(null)

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response: AxiosResponse<T> = await axios.get(apiUrl)
        setData(response.data)
      } catch (err) {
        setError(err)
      }
      setIsLoading(false)
    }

    fetchData()
  }, [apiUrl])

  return { data, isLoading, error }
}

export default useFetch
