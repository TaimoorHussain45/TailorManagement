import type { OrderStatus } from "@/types/types";
import { type SQLiteDatabase } from "expo-sqlite";

export type NewOrder = {
  customer_id: number;
  measurement_id?: number | null;
  title: string;
  description?: string;
  due_date?: string;
  quantity: number;
  status: OrderStatus;
  progress: number;
};

type ServiceResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function addOrder(
  db: SQLiteDatabase,
  data: NewOrder,
): Promise<ServiceResult<{ lastInsertRowId: number }>> {
  try {
    const result = await db.runAsync(
      `INSERT INTO "Order"
				(customer_id, measurement_id, title, description, status, due_date, quantity, progress)
			 VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
      data.customer_id,
      data.measurement_id ?? null,
      data.title,
      data.description ?? null,
      data.status,
      data.due_date ?? null,
      data.quantity,
      data.progress,
    );

    return { success: true, data: { lastInsertRowId: result.lastInsertRowId } };
  } catch (error) {
    console.error("addOrder failed:", error);
    return {
      success: false,
      error: "Could not save order. Please try again.",
    };
  }
}
