import { useState, useEffect, useCallback } from "react";
import { Service, ScreenState } from "../types";
import { mockServices, featuredIds } from "../data/mockServices";

interface UseServicesReturn {
  state: ScreenState;
  services: Service[];
  featured: Service[];
  retry: () => void;
}

const SIMULATED_DELAY = 1000;

export default function useServices(): UseServicesReturn {
  const [state, setState] = useState<ScreenState>("loading");
  const [services, setServices] = useState<Service[]>([]);
  const [featured, setFeatured] = useState<Service[]>([]);

  const fetchServices = useCallback(() => {
    setState("loading");

    const timer = setTimeout(() => {
      try {
        setServices(mockServices);
        setFeatured(
          mockServices.filter((s) => featuredIds.includes(s.id))
        );
        setState("ok");
      } catch {
        setState("error");
      }
    }, SIMULATED_DELAY);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const cleanup = fetchServices();
    return cleanup;
  }, [fetchServices]);

  const retry = useCallback(() => {
    fetchServices();
  }, [fetchServices]);

  return { state, services, featured, retry };
}
