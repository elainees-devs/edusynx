// src/constants/steps.ts
import type { IconType } from "react-icons";
import { FaUserCheck, FaDatabase, FaMoneyCheckAlt, FaChartBar } from "react-icons/fa";


export interface Step {
  icon: IconType;
  title: string;
  description: string;
}

export const steps: Step[] = [
  {
    icon: FaUserCheck,
    title: "1. Register Your School",
    description: "Sign up and set up your school profile in minutes. No tech skills required.",
  },
  {
    icon: FaDatabase,
    title: "2. Add Students & Classes",
    description: "Import your student data, define classes, and assign teachers easily.",
  },
  {
    icon: FaMoneyCheckAlt,
    title: "3. Automate Payments & Attendance",
    description: "Send invoices, track payments, and mark attendance all in one place.",
  },
  {
    icon: FaChartBar,
    title: "4. Monitor Progress with Real-Time Reports",
    description: "Get insights on fees, performance, and attendance instantly.",
  },
];
