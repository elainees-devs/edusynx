// server/src/docs/swagger.ts
import swaggerJSDoc from "swagger-jsdoc";
import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import {
  classSchema,
  sendLinkSchema,
  eventSchema,
  examSchema,
  feeSchema,
  feePaymentSchema,
  invoiceSchema,
  invoiceItemSchema,
  loginSchema,
  notificationSchema,
  paymentSchema,
  permissionSchema,
  rolePermissionSchema,
  schoolSchema,
  sessionSchema,
  studentSchema,
  subjectSchema,
  userSchema,
  classTeacherSchema,
} from "./components/schemas";



export const options: swaggerJSDoc.Options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "EduSynx API",
      version: "1.0.0",
      description: "Comprehensive API documentation for EduSynx backend",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Local development server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        ...classSchema,
        ...sendLinkSchema,
        ...eventSchema,
        ...examSchema,
        ...feeSchema,
        ...feePaymentSchema,
        ...invoiceSchema,
        ...invoiceItemSchema,
        ...loginSchema,
        ...notificationSchema,
        ...paymentSchema,
        ...permissionSchema,
        ...rolePermissionSchema,
        ...schoolSchema,
        ...sessionSchema,
        ...studentSchema,
        ...subjectSchema,
        ...userSchema,
        ...classTeacherSchema
      },
    },
    security: [{ bearerAuth: [] }],
  },
  apis: ["./src/routes/*.ts"],
};

export const setupSwagger = (app: Express) => {
  app.use(
    "/api-docs",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec, { explorer: true })
  );
};

export const swaggerSpec = swaggerJSDoc(options);
