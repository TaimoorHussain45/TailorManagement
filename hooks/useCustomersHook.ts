import { getAllCustomers } from "@/services/customer";
import type { Customer } from "@/types/types";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";

export const useCustomersHook = () => {
  const db = useSQLiteContext();
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const [visibleCustomerCount, setVisibleCustomerCount] = useState(10);

  const loadCustomers = useCallback(async () => {
    setLoading(true);
    setLoadError(null);
    setVisibleCustomerCount(10);

    try {
      const response = await getAllCustomers(db);

      if (!response.success) {
        setLoadError(
          typeof response.error === "string"
            ? response.error
            : "Unable to load customers. Please try again.",
        );
        setCustomers([]);
        return;
      }

      setCustomers(response.data);
    } catch (error) {
      console.error("loadCustomers failed:", error);
      setLoadError("Unable to load customers. Please try again.");
      setCustomers([]);
    } finally {
      setLoading(false);
    }
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      loadCustomers();
    }, [loadCustomers]),
  );

  return {
    customers,
    loading,
    loadError,
    loadCustomers,
    visibleCustomerCount,
    setVisibleCustomerCount,
  };
};
