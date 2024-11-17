import { useState, useEffect } from "react";

const useBaseUrl = () => {
  const [baseUrl, setBaseUrl] = useState(() => {
    const { protocol, host } = window.location;
    return `${protocol}//${host}`;
  });

  useEffect(() => {
    const handleUrlChange = () => {
      const { protocol, host } = window.location;
      setBaseUrl(`${protocol}//${host}`);
    };

    window.addEventListener("popstate", handleUrlChange);
    window.addEventListener("hashchange", handleUrlChange);

    return () => {
      window.removeEventListener("popstate", handleUrlChange);
      window.removeEventListener("hashchange", handleUrlChange);
    };
  }, []);

  return baseUrl;
};

export default useBaseUrl;
