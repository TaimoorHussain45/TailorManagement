import { DashboardData, getDashboardData } from "@/services/dashboardService";
import { useFocusEffect } from "expo-router";
import { useSQLiteContext } from "expo-sqlite";
import { useCallback, useState } from "react";

export function useDashboardData() {
  const db = useSQLiteContext();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    setLoading(true);
    const result = await getDashboardData(db);
    if (result.success) setData(result.data);
    setLoading(false);
  }, [db]);

  useFocusEffect(
    useCallback(() => {
      fetchData();
    }, [fetchData]),
  );

  return { data, loading, refetch: fetchData };
}
