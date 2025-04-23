const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "로그인 및 회원가입",
      version: "1.0.0",
      description: "로그인 및 회원가입 REST API 문서입니다.",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/auth.js"], // 주석으로부터 API 문서 생성
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
