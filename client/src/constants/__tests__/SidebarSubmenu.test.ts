import { describe, it, expect } from "vitest";
import {
  staffNavChildren,
  departmentNavChildren,
} from "../SidebarSubmenu";

describe("SidebarSubmenu", () => {
  describe("staffNavChildren", () => {
    it("has exactly 2 items", () => {
      expect(staffNavChildren).toHaveLength(2);
    });

    it("includes View Staff with correct path", () => {
      const view = staffNavChildren.find((c) => c.name === "View Staff");
      expect(view).toBeDefined();
      expect(view!.path).toBe("/dashboard/staff/view");
    });

    it("includes Register Staff with correct path", () => {
      const reg = staffNavChildren.find((c) => c.name === "Register Staff");
      expect(reg).toBeDefined();
      expect(reg!.path).toBe("/dashboard/staff/register");
    });

    it("all items have required properties", () => {
      for (const item of staffNavChildren) {
        expect(item.name).toBeTruthy();
        expect(item.icon).toBeDefined();
        expect(item.path).toBeTruthy();
      }
    });
  });

  describe("departmentNavChildren", () => {
    it("has exactly 2 items", () => {
      expect(departmentNavChildren).toHaveLength(2);
    });

    it("includes View Departments with correct path", () => {
      const view = departmentNavChildren.find((c) => c.name === "View Departments");
      expect(view).toBeDefined();
      expect(view!.path).toBe("/dashboard/departments/view");
    });

    it("includes Register Department with correct path", () => {
      const reg = departmentNavChildren.find((c) => c.name === "Register Department");
      expect(reg).toBeDefined();
      expect(reg!.path).toBe("/dashboard/departments/register");
    });

    it("all items have required properties", () => {
      for (const item of departmentNavChildren) {
        expect(item.name).toBeTruthy();
        expect(item.icon).toBeDefined();
        expect(item.path).toBeTruthy();
      }
    });
  });
});
