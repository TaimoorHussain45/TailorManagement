// services/dashboardService.ts
import { getWeekRange } from "@/utils/getWeekRange";
import { type SQLiteDatabase } from "expo-sqlite";

export type DashboardData = {
  fittingsThisWeek: number;
  weekPlannedPercent: number;
  activeOrders: number;
  customersSaved: number;
  recentActivity: {
    customerName: string;
    title: string;
    lastUpdated: string;
  }[];
};

export async function getDashboardData(
  db: SQLiteDatabase,
): Promise<
  { success: true; data: DashboardData } | { success: false; error: string }
> {
  try {
    const { start, end } = getWeekRange();

    const [fittingsRow] = await db.getAllAsync<{ count: number }>(
      `SELECT COUNT(*) as count FROM "Order" WHERE due_date BETWEEN ? AND ?`,
      start,
      end,
    );

    const [activeRow] = await db.getAllAsync<{ count: number }>(
      `SELECT COUNT(*) as count FROM "Order" WHERE status != 'Completed'`,
    );

    const [customerRow] = await db.getAllAsync<{ count: number }>(
      `SELECT COUNT(*) as count FROM Customer`,
    );

    // "Week planned %" = share of this week's due orders that are Completed
    const [completedThisWeekRow] = await db.getAllAsync<{ count: number }>(
      `SELECT COUNT(*) as count FROM "Order" WHERE due_date BETWEEN ? AND ? AND status = 'Completed'`,
      start,
      end,
    );

    const recentActivity = await db.getAllAsync<{
      customerName: string;
      title: string;
      lastUpdated: string;
    }>(`
      SELECT c.name AS customerName, o.title, o.updated_at AS lastUpdated
      FROM "Order" o
      JOIN Customer c ON c.id = o.customer_id
      ORDER BY o.updated_at DESC
      LIMIT 5
    `);

    const fittingsThisWeek = fittingsRow.count;
    const weekPlannedPercent =
      fittingsThisWeek === 0
        ? 0
        : Math.round((completedThisWeekRow.count / fittingsThisWeek) * 100);

    return {
      success: true,
      data: {
        fittingsThisWeek,
        weekPlannedPercent,
        activeOrders: activeRow.count,
        customersSaved: customerRow.count,
        recentActivity,
      },
    };
  } catch (error) {
    console.error("getDashboardData failed:", error);
    return { success: false, error: "Could not load dashboard data." };
  }
}
