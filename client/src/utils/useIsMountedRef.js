import React from 'react';

export default (...values) => {
  const isMountedRef = React.useRef(null);
  React.useEffect(() => {
    isMountedRef.current = true;
    return () => (isMountedRef.current = false);
  }, values);
  return isMountedRef;
};
