import { useState, useEffect } from "react";
import axios from "axios";

import { RAPIDAPI_KEY, RAPIDAPI_HOST } from '@env'

const key = RAPIDAPI_KEY
const host = RAPIDAPI_HOST


export const useFetch = (endpoint, query) => {

  const [data, setData] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [isError, setIsError] = useState()


  const options = {
    method: 'GET',
    url: `https://jsearch.p.rapidapi.com/${endpoint}`,

    headers: {
      'X-RapidAPI-Key': key,
      'X-RapidAPI-Host': host
    },

    params: { ...query },
  };

  const fetchData = async () => {
    setIsLoading(true)

    try {

      const resp = await axios.request(options)

      // console.log(resp.data)
      setData(resp.data.data)
      setIsLoading(false)
    } catch (err) {
      // console.log(err)
      setIsError(err)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  const refetch = () => {
    setIsLoading(true)
    fetchData()
  }

  return { data, refetch, isLoading, isError }
}

