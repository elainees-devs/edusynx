import { describe, it, expect } from "vitest";
import { principalNavItems } from "../SidebarMenu";
import {
  staffNavChildren,
  departmentNavChildren,
} from "../SidebarSubmenu";

describe("SidebarMenu", () => {
  describe("principalNavItems", () => {
    it("contains a Staff entry with correct structure", () => {
      const staff = principalNavItems.find((n) => n.name === "Staff");
      expect(staff).toBeDefined();
      expect(staff!.path).toBe("/dashboard/staff");
      expect(staff!.children).toBe(staffNavChildren);
    });

    it("contains a Departments entry with correct structure", () => {
      const dept = principalNavItems.find((n) => n.name === "Departments");
      expect(dept).toBeDefined();
      expect(dept!.path).toBe("/dashboard/departments");
      expect(dept!.children).toBe(departmentNavChildren);
    });

    it("has Staff item before Students item", () => {
      const names = principalNavItems.map((n) => n.name);
      const staffIdx = names.indexOf("Staff");
      const studentsIdx = names.indexOf("Students");
      expect(staffIdx).toBeGreaterThanOrEqual(0);
      expect(studentsIdx).toBeGreaterThanOrEqual(0);
      expect(staffIdx).toBeLessThan(studentsIdx);
    });

    it("has Departments item after Enrollments and before Reports", () => {
      const names = principalNavItems.map((n) => n.name);
      const enrollIdx = names.indexOf("Enrollments");
      const deptIdx = names.indexOf("Departments");
      const reportsIdx = names.indexOf("Reports");
      expect(enrollIdx).toBeGreaterThanOrEqual(0);
      expect(deptIdx).toBeGreaterThanOrEqual(0);
      expect(reportsIdx).toBeGreaterThanOrEqual(0);
      expect(enrollIdx).toBeLessThan(deptIdx);
      expect(deptIdx).toBeLessThan(reportsIdx);
    });

    it("all entries have icon, name, and path", () => {
      for (const item of principalNavItems) {
        expect(item.name).toBeTruthy();
        expect(item.icon).toBeDefined();
        expect(item.path).toBeTruthy();
      }
    });
  });
});
