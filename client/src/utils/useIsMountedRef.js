import React from 'react';

export default () => {
  const isMountedRef = React.useRef(null);
  React.useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, []);
  return isMountedRef;
};
