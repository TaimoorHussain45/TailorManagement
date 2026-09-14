import { Measurement } from "@/types/types";
import { type SQLiteDatabase } from "expo-sqlite";

export type NewMeasurement = Omit<Measurement, "id" | "created_at">;

type ServiceResult<T> =
  | { success: true; data: T }
  | { success: false; error: string };

export async function addMeasurement(
  db: SQLiteDatabase,
  data: NewMeasurement,
): Promise<ServiceResult<{ lastInsertRowId: number }>> {
  try {
    const result = await db.runAsync(
      `INSERT INTO Measurement
        (customer_id, shirt_length, chest, shoulder, sleeve, collar, ghera,
         shalwar_length, paoncha_width, collar_style, cuff_style, pocket_config,
         bottom_type, waist_attachment)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      data.customer_id,
      data.shirt_length,
      data.chest,
      data.shoulder,
      data.sleeve,
      data.collar,
      data.ghera,
      data.shalwar_length,
      data.paoncha_width,
      data.collar_style,
      data.cuff_style,
      data.pocket_config,
      data.bottom_type,
      data.waist_attachment,
    );
    return { success: true, data: { lastInsertRowId: result.lastInsertRowId } };
  } catch (error) {
    console.error("addMeasurement failed:", error);
    return {
      success: false,
      error: "Could not save measurements. Please try again.",
    };
  }
}
