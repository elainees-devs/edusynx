import { createSchoolSchema } from "../../../validation/school.schema";

describe("createSchoolSchema", () => {
  const basePayload = {
    name: "Lewis Preparatory",
    address: "4646 Kisii",
    phoneNumber: "0723456731",
    email: "lewisprepatory@gmail.com",
    establishedYear: new Date().getFullYear(),
    schoolCode: "6654",
    role: "principal",
  };

  it("accepts subscription with string planId", () => {
    const result = createSchoolSchema.safeParse({
      ...basePayload,
      subscription: {
        planId: "698086491839683dd7ee8765",
        duration: 3,
      },
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.subscription.planId).toBe("698086491839683dd7ee8765");
      expect(result.data.subscription.duration).toBe(3);
    }
  });

  it("accepts subscription with object planId and normalizes to id string", () => {
    const result = createSchoolSchema.safeParse({
      ...basePayload,
      subscription: {
        planId: {
          _id: "698086491839683dd7ee8765",
        },
        duration: 6,
      },
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.subscription.planId).toBe("698086491839683dd7ee8765");
      expect(result.data.subscription.duration).toBe(6);
    }
  });

  it("fails when subscription fields are missing", () => {
    const result = createSchoolSchema.safeParse({
      ...basePayload,
      subscription: {},
    });

    expect(result.success).toBe(false);
  });
});
