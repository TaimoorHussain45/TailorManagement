import { Lock, ShieldCheck } from "lucide-react-native";

type Fieldtypes = {
  key: string;
  label: string;
  unit: string;
};

export const upperFields: Fieldtypes[] = [
  { key: "shirtLength", label: "Shirt Length", unit: "in" },
  { key: "chest", label: "Chest", unit: "in" },
  { key: "shoulder", label: "Shoulder", unit: "in" },
  { key: "sleeveLength", label: "Sleeve Length", unit: "in" },
  { key: "collar", label: "Collar", unit: "in" },
  { key: "gheraDamen", label: "Ghera / Damen", unit: "in" },
];

export const lowerFields: Fieldtypes[] = [
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
  },
  {
    icon: Lock,
    title: "24",
    paragraph: "customer saved",
    rightOrder: "people",
  },
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
