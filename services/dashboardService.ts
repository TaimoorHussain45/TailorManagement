// services/dashboardService.ts
import { DashboardData } from "@/types/types";
import { getWeekRange } from "@/utils/getWeekRange";
import { type SQLiteDatabase } from "expo-sqlite";

export async function getDashboardData(
  db: SQLiteDatabase,
): Promise<
  { success: true; data: DashboardData } | { success: false; error: string }
> {
  try {
    const { start, end } = getWeekRange();

    const [fittingsRow] = await db.getAllAsync<{ count: number }>(
      `SELECT COUNT(*) as count
       FROM "Order"
       WHERE status = 'Cutting Fabric'`,
    );

    const [activeRow] = await db.getAllAsync<{ count: number }>(
      `SELECT COUNT(*) as count
   FROM "Order"
   WHERE status != 'Ready'
   AND status != 'Delivered'`,
    );

    const [customerRow] = await db.getAllAsync<{ count: number }>(
      `SELECT COUNT(*) as count FROM Customer`,
    );

    const [weeklyOrdersRow] = await db.getAllAsync<{
      total: number;
      ready: number;
    }>(
      `SELECT COUNT(*) as total,
              COUNT(CASE WHEN status IN ('Ready', 'Delivered') THEN 1 END) as ready
       FROM "Order"
       WHERE datetime(updated_at) BETWEEN datetime(?) AND datetime(?)`,
      start,
      end,
    );

    const recentActivity = await db.getAllAsync<{
      activityId: number;
      entityType: "customer" | "measurement" | "order";
      entityId: number;
      customerId: number;
      customerName: string;
      activity: string;
      occurredAt: string;
    }>(
      `SELECT
         id AS activityId,
         entity_type AS entityType,
         entity_id AS entityId,
         customer_id AS customerId,
         customer_name AS customerName,
         activity,
         occurred_at AS occurredAt
       FROM ActivityLog
       ORDER BY datetime(occurred_at) DESC, id DESC
       LIMIT 4`,
    );
    const fittingsThisWeek = fittingsRow.count;
    return {
      success: true,
      data: {
        fittingsThisWeek,
        readyOrdersThisWeek: weeklyOrdersRow.ready,
        totalOrdersThisWeek: weeklyOrdersRow.total,
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
