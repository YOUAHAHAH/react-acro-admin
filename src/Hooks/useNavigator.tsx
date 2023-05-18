import { useEffect, useState } from "react";

interface natWerkInfo {
  type?: string;
  rtt?: number;
  downlink?: number;
}

export const useNavigator = () => {
  const [natWerkInfo, setNatWerkInfo] = useState<natWerkInfo>({});

  const getNetworkInfo = () => {
    if (navigator.onLine) {
      setNatWerkInfo({
        type: navigator.connection.effectiveType,
        rtt: navigator.connection.rtt,
        downlink: navigator.connection.downlink
      });
    } else {
      setNatWerkInfo({
        type: "offline"
      });
    }
    return natWerkInfo;
  };

  window.addEventListener("online", getNetworkInfo);
  window.addEventListener("offline", getNetworkInfo);
  navigator.connection.addEventListener("change", getNetworkInfo);

  useEffect(() => {
    getNetworkInfo();
  }, []);

  return { natWerkInfo };
};
