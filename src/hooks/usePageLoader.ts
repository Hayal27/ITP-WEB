import React from 'react';

function usePageLoader() {
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    // Reduced to 800ms for faster page access while still showing the branding
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);
  return loading;
}

export default usePageLoader;
