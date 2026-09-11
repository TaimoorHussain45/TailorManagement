import type { Customer } from "@/types/types";
import { SQLiteDatabase } from "expo-sqlite";

export const addCustomer = async (
  db: SQLiteDatabase,
  data: {
    name: string;
    phone: string;
    notes?: string;
    address?: string;
  },
) => {
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

    console.log("Customer inserted:", result);

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

export async function getCustomerById(db: SQLiteDatabase, id: number) {
  try {
    const result = await db.getFirstAsync(
      "SELECT * FROM Customer WHERE id = ?",
      id,
    );

    return {
      success: true,
      data: result,
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: null,
      error,
    };
  }
}
