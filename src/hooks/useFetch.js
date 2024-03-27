/* eslint-disable no-unused-vars */
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";




export const useFetch = (url, jsonito) => {

const { redibujar } = useSelector((state) => state.generales);

  const [state, setState] = useState({
    data: null,
    isLoading: false,
    hasError: false,
    error: null,
  });

  useEffect(() => {
    getFetch();
  }, [url, redibujar]);

  const setLoadingState = () => {
    setState({
      data: null,
      isLoading: true,
      hasError: false,
      error: null,
    });
  };

  const getFetch = async () => {
    setLoadingState();
    const resp = await fetch(url, {
      method: 'POST',
      body: JSON.stringify(jsonito),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    if (!resp.ok) {
      setState({
        data: null,
        isLoading: false,
        hasError: true,
        error: {
          code: resp.status,
          message: resp.statusText,
        },
      });
      return;
    }

    const data = await resp.json();
    setState({
      data: data,
      isLoading: false,
      hasError: false,
      error: null,
    });
  };

  return {
    data: state.data,
    isLoading: state.isLoading,
    hasError: state.hasError,
  };
};
