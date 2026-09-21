import { DashboardData } from "@/services/dashboardService";

export const getCardTitle = (
  key: string,
  defaultTitle: string,
  data: DashboardData | null,
  loading: boolean,
) => {
  if (loading || !data) {
    return "…";
  }

  if (key === "activeOrders") {
    return String(data.activeOrders);
  }

  if (key === "customersSaved") {
    return String(data.customersSaved);
  }

  return defaultTitle;
};
