import {useEffect, useState} from 'react';
import {initializationComplete} from '../utils/globalState';

export default function useResources() {
  const [isLoadingComplete, setLoadingComplete] = useState(false);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResources() {
      try {
        // Load initializationComplete
        await Promise.all([initializationComplete]);
      } catch (e) {
        console.warn(e);
      } finally {
        setLoadingComplete(true);
      }
    }

    loadResources();
  }, []);

  return isLoadingComplete;
}
