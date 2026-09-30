import { getAllOrders } from "@/services/orders";
import { OrderRecord } from "@/types/types";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";

export const useOrdersHook = () => {
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);
  const db = useSQLiteContext();
  const [orders, setOrders] = useState<OrderRecord[]>([]);
  const loadCustomers = useCallback(async () => {
    setLoading(true);
    setLoadError(null);

    try {
      const response = await getAllOrders(db);
      if (!response.success) {
        setLoadError(
          typeof response.error === "string"
            ? response.error
            : "Unable to load oders. Please try again.",
        );
        setOrders([]);
        return;
      }

      setOrders(response.data);
    } catch (error) {
      console.error("loadCustomers failed:", error);
      setLoadError("Unable to load oders. Please try again.");
      setOrders([]);
    } finally {
      setLoading(false);
    }
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      loadCustomers();
    }, [loadCustomers]),
  );

  return { orders, loading, loadError };
};
