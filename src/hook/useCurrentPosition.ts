import { useEffect, useState } from "react";
import { Coordinates } from "src/model";

type Return = {
  userPosition: Coordinates | null;
  geocodingError: string | null;
  deniedAccess: boolean;
};

const useCurrentPosition = (): Return => {
  const [userPosition, setUserPosition] = useState<Coordinates | null>(null);
  const [geocodingError, setGeocodingError] = useState<string | null>(null);
  const [deniedAccess, setDeniedAccess] = useState(false);

  const clearErrors = () => {
    setGeocodingError(null);
    setDeniedAccess(false);
  };

  useEffect(() => {
    if (!navigator.geolocation) {
      setGeocodingError("geolocation-not-supported");
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setUserPosition({ latitude, longitude });
        if (geocodingError || deniedAccess) {
          clearErrors();
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setDeniedAccess(true);
          setGeocodingError(null);
          return;
        }

        setGeocodingError("geolocation-error");
        setDeniedAccess(false);
      },
      {
        timeout: 10000,
        enableHighAccuracy: true,
      }
    );
  }, []);

  return {
    userPosition,
    geocodingError,
    deniedAccess,
  };
};

export default useCurrentPosition;
