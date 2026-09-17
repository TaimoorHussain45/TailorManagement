import type { OrderRecord, OrderStatus } from "@/types/types";
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

export type UpdateOrder = Omit<NewOrder, "customer_id" | "measurement_id">;

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
export async function getAllOrders(
  db: SQLiteDatabase,
): Promise<
  | { success: true; data: OrderRecord[]; error: null }
  | { success: false; data: null; error: unknown }
> {
  try {
    const response = await db.getAllAsync<OrderRecord>(`
      SELECT o.*, c.name AS customerName, c.phone AS phoneNumber
      FROM "Order" o
      JOIN Customer c ON c.id = o.customer_id
      ORDER BY o.created_at DESC
    `);

    return {
      success: true,
      data: response,
      error: null,
    };
  } catch (error) {
    console.error("getAllOrders failed:", error);

    return {
      success: false,
      data: null,
      error,
    };
  }
}

export async function getOrderById(
  db: SQLiteDatabase,
  id: number,
): Promise<
  | { success: true; data: OrderRecord | null }
  | { success: false; error: string }
> {
  try {
    const result = await db.getFirstAsync<OrderRecord>(
      `
      SELECT o.*, c.name AS customerName, c.phone AS phoneNumber
      FROM "Order" o
      JOIN Customer c ON c.id = o.customer_id
      WHERE o.id = ?
    `,
      id,
    );
    return { success: true, data: result ?? null };
  } catch (error) {
    console.error("getOrderById failed:", error);
    return { success: false, error: "Could not load order. Please try again." };
  }
}

export async function getOrdersByCustomerId(
  db: SQLiteDatabase,
  customerId: number,
) {
  const result = await getAllOrders(db);
  if (!result.success) return result;
  return {
    success: true as const,
    data: result.data.filter((order) => order.customer_id === customerId),
  };
}

export async function updateOrder(
  db: SQLiteDatabase,
  id: number,
  data: UpdateOrder,
) {
  try {
    const result = await db.runAsync(
      `UPDATE "Order" SET title = ?, description = ?, status = ?, due_date = ?, quantity = ?, progress = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?`,
      data.title,
      data.description?.trim() || null,
      data.status,
      data.due_date?.trim() || null,
      data.quantity,
      data.progress,
      id,
    );
    return result.changes > 0
      ? { success: true as const }
      : { success: false as const, error: "Order not found." };
  } catch (error) {
    console.error("updateOrder failed:", error);
    return { success: false as const, error: "Could not update order." };
  }
}

export async function deleteOrderById(db: SQLiteDatabase, id: number) {
  try {
    const result = await db.runAsync(`DELETE FROM "Order" WHERE id = ?`, id);
    return result.changes > 0
      ? { success: true as const }
      : { success: false as const, error: "Order not found." };
  } catch (error) {
    console.error("deleteOrderById failed:", error);
    return { success: false as const, error: "Could not delete order." };
  }
}
