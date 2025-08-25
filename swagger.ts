import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import { Express } from "express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "My API",
    version: "1.0.0",
    description: "API documentation for my app",
  },
  components: {
    schemas: {
      ApiResponse: {
        type: "object",
        properties: {
          success: { type: "boolean", example: true },
          status: { type: "integer", example: 200 },
          message: { type: "string", example: "Request successful" },
          data: { type: "object", nullable: true, example: { id: 1, name: "Kishor" } },
          details: { type: "object", nullable: true, example: null },
        },
      },
    },
  },
};

const options = {
  swaggerDefinition,
  apis: ["./src/api/v1.0/auth/auth.routes.ts"], // path to your route files
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
};
