import { useEffect, useState } from "react";
import useAxiosPrivate from "./useAxiosPrivate";

const useFetch = (endpoint) => {
  const [data, setData] = useState(undefined);
  const [isError, setIsError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        const res = await axiosPrivate.get(endpoint, {
          signal: controller.signal,
        });
        isMounted && setData(res.data);
      } catch (err) {
        if (err.response.status === 401) {
          console.log("Refresh Token Expired");
        }
        setIsError(err);
      }
      setIsLoading(false);
    };

    fetchData();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate, endpoint]);

  return { data, isError, isLoading, setData };
};

export default useFetch;
