import { useEffect, useState } from "react";

const useFetch = (url) => {
  let [ data, setData ] = useState(undefined);
  let [ isError, setIsError ] = useState(null);
  let [ isLoading, setIsLoading ] = useState(false);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        setIsError(false);
        let res = await fetch(url);
        if (res.status >= 500) {
          let text = res.statusText;
          setIsError(new Error(text));
        }
        let json = await res.json();
        if (json.error) {
          setIsError(new Error(json.error));
        } else {
          setData(json);
        }
      }
      catch (err) {
        setIsError(err);
      }
      setIsLoading(false);
    }
    fetchData();
  }, [url]);
  return { data, isError, isLoading };
}

export default useFetch;