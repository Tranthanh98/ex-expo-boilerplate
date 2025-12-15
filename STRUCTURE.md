my-app/
├─ apps/
│ ├─ api/ # ExpressJS
│ │ ├─ src/
│ │ │ ├─ modules/
│ │ │ │ └─ user/
│ │ │ │ ├─ user.route.ts
│ │ │ │ ├─ user.controller.ts
│ │ │ │ ├─ user.service.ts
│ │ │ │ └─ user.swagger.ts
│ │ │ ├─ app.ts
│ │ │ └─ index.ts
│ │ ├─ openapi.json # generated
│ │ └─ package.json
│ │
│ └─ mobile/ # React Native / Expo
│ ├─ src/
│ │ ├─ api/ # generated client
│ │ ├─ screens/
│ │ ├─ hooks/
│ │ └─ features/
│ └─ package.json
│
├─ packages/
│ ├─ api-client/ # OpenAPI generated (optional)
│ │ ├─ src/
│ │ └─ package.json
│ │
│ └─ tooling/ # scripts, codegen
│
├─ scripts/
│ └─ generate-api.ts
│
├─ pnpm-workspace.yaml
└─ package.json
