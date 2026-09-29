import { ORDER_STAGES } from "@/constants/data";
import { OrderStatus } from "@/types/types";

export const getProgress = (status: OrderStatus): number =>
  ORDER_STAGES.find((s) => s.status === status)?.progress ?? 0;
