import { useState } from "react";
import { useEffect } from "react";

const useFetch = (url, refresh, initialData = []) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [leadData, setLeadData] = useState([]);

  useEffect(() => {

    if (!url) {
      return;
    }

    setLoading(true);
    setError(null);
    setLeadData([]);
    

    fetch(url)
      .then((res) => {
        if (res.status === 404) {
          setLeadData([]);
          return null;
        }

        return res.json();
      })
      .then((data) => {
        if (data) {
          setLeadData(data.data || data);
        }
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => setLoading(false));
  }, [url, refresh]);

  return { leadData, loading, error };
};

export default useFetch;
