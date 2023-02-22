import React, { useState, useEffect } from 'react';


export function WatchComponent() {
  const [watchTime, setWatchTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setWatchTime(new Date());
    }, 1000);
    return clearInterval(timer);
  }, []);

  return (
    <div>
      { String(watchTime) }
    </div>
  );
}
