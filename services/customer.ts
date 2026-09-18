import type { Customer } from "@/types/types";
import { SQLiteDatabase } from "expo-sqlite";

type AddCustomerResponse =
  | {
      success: true;
      data: { lastInsertRowId: number };
      error: null;
      message: string;
    }
  | {
      success: false;
      data: null;
      error: string;
    };

export const addCustomer = async (
  db: SQLiteDatabase,
  data: {
    name: string;
    phone: string;
    notes?: string;
    address?: string;
  },
): Promise<AddCustomerResponse> => {
  try {
    const result = await db.runAsync(
      `INSERT INTO Customer
       (name, phone, notes, address)
       VALUES (?, ?, ?, ?)`,
      data.name,
      data.phone,
      data.notes ?? null,
      data.address ?? null,
    );

    // console.log("Customer inserted:", result);

    return {
      success: true,
      data: result,
      error: null,
      message: "Customer added successfully",
    };
  } catch (error) {
    console.error("Add customer error:", error);

    return {
      success: false,
      data: null,
      error: "Failed to add customer",
    };
  }
};

export const getAllCustomers = async (
  db: SQLiteDatabase,
): Promise<
  | { success: true; data: Customer[]; error: null }
  | { success: false; data: null; error: unknown }
> => {
  try {
    const result = await db.getAllAsync<Customer>("SELECT * FROM Customer");
    return {
      success: true,
      data: result,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error: error,
    };
  }
};

export async function getCustomerById(
  db: SQLiteDatabase,
  id: number,
): Promise<
  | { success: true; data: Customer | null; error: null }
  | { success: false; data: null; error: string }
> {
  try {
    const result = await db.getFirstAsync<Customer>(
      "SELECT * FROM Customer WHERE id = ?",
      id,
    );

    return {
      success: true,
      data: result,
      error: null,
    };
  } catch (error) {
    console.error("getCustomerById failed:", error);
    return {
      success: false,
      data: null,
      error: "Could not load customer. Please try again.",
    };
  }
}

export async function updateCustomer(
  db: SQLiteDatabase,
  id: number,
  data: { name: string; phone: string; address?: string; notes?: string },
) {
  try {
    const result = await db.runAsync(
      `UPDATE Customer SET name = ?, phone = ?, address = ?, notes = ? WHERE id = ?`,
      data.name,
      data.phone,
      data.address?.trim() || null,
      data.notes?.trim() || null,
      id,
    );

    return result.changes > 0
      ? { success: true as const }
      : { success: false as const, error: "Customer not found." };
  } catch (error) {
    console.error("updateCustomer failed:", error);
    return { success: false as const, error: "Could not update customer." };
  }
}
export const deleteCustomerById = async (db: SQLiteDatabase, id: number) => {
  try {
    await db.runAsync("DELETE FROM Measurement WHERE customer_id = ?", id);
    await db.runAsync("DELETE FROM Customer WHERE id = ?", id);
    return { success: true };
  } catch (error) {
    console.error("Delete customer error:", error);
    return { success: false, error: "Failed to delete customer" };
  }
};
