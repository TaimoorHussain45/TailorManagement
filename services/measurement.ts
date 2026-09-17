import { Measurement } from "@/types/types";
import { type SQLiteDatabase } from "expo-sqlite";

export type NewMeasurement = Omit<Measurement, "id" | "created_at">;
export type UpdateMeasurement = Omit<
  Measurement,
  "id" | "customer_id" | "created_at"
>;

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
         shalwar_length, paoncha_width, collar_style,ghera_style, cuff_style, pocket_config,
         bottom_type, waist_attachment)
       VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?,?, ?)`,
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
      data.ghera_style,
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

export async function getMeasurement(
  db: SQLiteDatabase,
  customerId: number,
): Promise<ServiceResult<Measurement[]>> {
  try {
    const result = await db.getAllAsync<Measurement>(
      `SELECT * FROM Measurement WHERE customer_id = ? ORDER BY created_at DESC`,
      customerId,
    );
    return { success: true, data: result };
  } catch (error) {
    console.error(error);
    return {
      success: false,
      error: "Could not load measurements. Please try again.",
    };
  }
}

export async function getMeasurementById(
  db: SQLiteDatabase,
  measurementId: number,
): Promise<ServiceResult<Measurement | null>> {
  try {
    const result = await db.getFirstAsync<Measurement>(
      `SELECT * FROM Measurement WHERE id = ?`,
      measurementId,
    );
    return { success: true, data: result ?? null };
  } catch (error) {
    console.error("getMeasurementById failed:", error);
    return {
      success: false,
      error: "Could not load measurement. Please try again.",
    };
  }
}
export const updateMeasurement = async (
  db: SQLiteDatabase,
  id: number,
  data: UpdateMeasurement,
) => {
  try {
    const result = await db.runAsync(
      `UPDATE Measurement SET
        shirt_length = ?, chest = ?, shoulder = ?, sleeve = ?, collar = ?,
        ghera = ?, shalwar_length = ?, paoncha_width = ?,
        collar_style = ?, cuff_style = ?, pocket_config = ?,
        bottom_type = ?, waist_attachment = ?
       WHERE id = ?`,
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
      id,
    );

    if (result.changes === 0) {
      return { success: false, error: "Record not found." } as const;
    }
    return { success: true } as const;
  } catch (error) {
    console.error("Failed to update measurement:", error);
    return {
      success: false,
      error: "Could not update measurement. Please try again.",
    } as const;
  }
};
