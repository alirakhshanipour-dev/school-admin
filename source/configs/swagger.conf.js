import swaggerJSDoc from "swagger-jsdoc";
import { serve, setup } from "swagger-ui-express";
import path from "path";

const swaggerDefinition = {
    openapi: '3.0.0',
    info: {
        title: 'API of School',
        version: '1.0.0',
        description: "API's of school admin panel",
    },
    servers: [
        {
            url: 'http://localhost:3000', // Change this to your server's URL
            description: 'Development server',
        },
    ],
};

const options = {
    swaggerDefinition,
    // Path to Swagger definition files
    path: [],
    // Path to API route files
    apis: [path.join(process.cwd(), "source", "controllers", "**", "*.swagger.js")],
};

// Generate Swagger specification
const swaggerSpec = swaggerJSDoc(options);

// Middleware function to set up Swagger UI
export const swaggerConfig = (app) => {
    // Serve Swagger UI on /api-docs endpoint
    app.use('/api-docs', serve, setup(swaggerSpec, {
        customCssUrl: "/css/customize-swagger.css",
        customJs: "/js/customize-swagger.js",
    }));
};
