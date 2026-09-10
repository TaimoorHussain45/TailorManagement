import type {
  FieldType,
  OrderCardData,
  RadioGroupType,
  StyleOptionGroup,
} from "@/types";
import { router } from "expo-router";
import { Lock, Moon, ShieldCheck, Smartphone, Sun } from "lucide-react-native";
type ThemeMode = "light" | "dark" | "system";
export const upperFields: FieldType[] = [
  { key: "shirtLength", label: "Shirt Length", unit: "in" },
  { key: "chest", label: "Chest", unit: "in" },
  { key: "shoulder", label: "Shoulder", unit: "in" },
  { key: "sleeveLength", label: "Sleeve Length", unit: "in" },
  { key: "collar", label: "Collar", unit: "in" },
  { key: "gheraDamen", label: "Ghera / Damen", unit: "in" },
];

export const lowerFields: FieldType[] = [
  { key: "shalwarLength", label: "Shalwar Length", unit: "in" },
  { key: "paonchaWidth", label: "Paoncha Width", unit: "in" },
];
export const authCardsData = [
  {
    icon: ShieldCheck,
    title: "Only you",
    paragraph: "Protected from curious eyes.",
  },
  {
    icon: Lock,
    title: "On-device",
    paragraph: "No passwords to remember.",
  },
];
export const homeCardsData = [
  {
    icon: ShieldCheck,
    title: "12",
    paragraph: "active orders",
    rightOrder: "orders",
    onPress: () => {
      router.push("/(tabs)/orders");
    },
  },
  {
    icon: Lock,
    title: "24",
    paragraph: "customer saved",
    rightOrder: "people",
    // onPress: router.replace("/(tabs)/customer"),
    onPress: () => {
      router.push("/(tabs)/customer");
    },
  },
];

export const themeOptions: {
  mode: ThemeMode;
  label: string;
  icon: typeof Sun;
}[] = [
  { mode: "light", label: "Light", icon: Sun },
  { mode: "dark", label: "Dark", icon: Moon },
  { mode: "system", label: "System", icon: Smartphone },
];
export const dummyCustomers = [
  {
    customerName: "Ahmed Raza",
    title: "Ahmed Raza",
    text: "Regular Customer",
  },
  {
    customerName: "Sara Khan",
    title: "Sara Khan",
    text: "VIP Customer",
  },
  {
    customerName: "Bilal Ahmed",
    title: "Bilal Ahmed",
    text: "New Customer",
  },
];
export const dummyUsers = [
  {
    customerName: "Ahmed Raza",
    title: "Ahmed Raza",
    text: "Regular Customer",

    phoneNumber: "+923009646067",
  },
  {
    customerName: "Sara Khan",
    title: "Sara Khan",
    text: "VIP Customer",

    phoneNumber: "+92300986087",
  },
  {
    customerName: "Bilal Ahmed",
    title: "Bilal Ahmed",
    text: "New Customer",

    phoneNumber: "+923005926067",
  },
];
// Add to your existing constants/data.ts (alongside upperFields, lowerFields, lowerStyleOptions)

export const ordersData: OrderCardData[] = [
  {
    id: "AT-1048",
    customerName: "Sara Khan",
    status: "In Progress",
    title: "Suit silk two types",
    dueDate: "14 Oct",
    progress: 89,
  },
  {
    id: "AT-1049",
    customerName: "Ahmed Raza",
    status: "Pending",
    title: "Kameez Shalwar cotton",
    dueDate: "18 Oct",
    progress: 25,
  },
  {
    id: "AT-1050",
    customerName: "Bilal Hussain",
    status: "Completed",
    title: "Waistcoat wool blend",
    dueDate: "10 Oct",
    progress: 100,
  },
  {
    id: "AT-1051",
    customerName: "Usman Tariq",
    status: "Delayed",
    title: "Sherwani embroidered",
    dueDate: "05 Oct",
    progress: 60,
  },
];
export const singleOrdersData: OrderCardData = {
  id: "AT-1048",
  customerName: "Sara Khan",
  status: "In Progress",
  title: "Suit silk two types",
  dueDate: "14 Oct",
  progress: 89,
};

export const singleMeasurementData = {
  date: "08 Oct 2024",
  description: "Upper and lower body record",
  measurements: [
    { label: "Chest", value: "36", unit: "in" },
    { label: "Waist", value: "30", unit: "in" },
    { label: "Inseam", value: "29", unit: "in" },
  ],
};

export const upperStyleOptions: StyleOptionGroup[] = [
  {
    title: "Collar / Ban Style",
    type: "radio",
    options: ["Sherwani Ban (Straight)", "Shirt Collar", "Round Ban"],
  },
  {
    title: "Cuff / Sleeve End",
    type: "dropdown",
    options: ["Button Cuff", "Soft Cuff", "Open / Simple Fold"],
  },
  {
    title: "Ghera / Damen Style",
    type: "dropdown",
    options: ["Straight (Chokor)", "Round (Gol)"],
  },
  {
    title: "Pocket Configuration",
    type: "checkbox",
    options: [
      "Front Chest Pocket",
      "Side Pockets (1 or 2)",
      "Inner / Pencil Slot",
    ],
  },
];
export const lowerStyleOptions: RadioGroupType[] = [
  {
    key: "bottomGarmentType",
    title: "Bottom Garment Type",
    options: ["Traditional Shalwar", "Trouser / Pajama", "Churidar"],
  },
  {
    key: "waistAttachment",
    title: "Waist / Belt Attachment",
    options: ["Elastic Belt", "Drawstring (Nala)"],
  },
];
