import { useEffect, useState } from "react";
import { Coordinates } from "src/model";

type Return = {
  userPosition: Coordinates | null;
  geocodingError: string | null;
  clearError: () => void;
  askGeolocationPermission: () => void;
};

const useCurrentPosition = (): Return => {
  const [userPosition, setUserPosition] = useState<Coordinates | null>(null);
  const [geocodingError, setGeocodingError] = useState<string | null>(null);

  const clearError = () => setGeocodingError(null);

  const askGeolocationPermission = () => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition({ latitude, longitude });
      },
      (error) => {
        if (error.code !== error.PERMISSION_DENIED) {
          setGeocodingError("geolocation-error");
        }
      },
      {
        timeout: 10000,
      }
    );
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeocodingError("geolocation-not-supported");
      return;
    }

    askGeolocationPermission();
  }, []);

  return { userPosition, geocodingError, clearError, askGeolocationPermission };
};

export default useCurrentPosition;
