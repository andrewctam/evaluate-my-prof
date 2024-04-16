# Evaluate my Professor

A Rate My Professor clone, used for my CSE 300 final project demo.


![](demo.png)
## Installation
- Navigate to `/backend/src/main/resources/application.properties.template`
- Add a MongoDB connection URI in spring.data.mongodb.uri
- Rename this to `application.properties`

## Running
To run the frontend:
```shell
cd frontend
npm install
npm run dev
```

To run the backend:
```shell
cd backend
chmod +x gradlew #if permission is denied
./gradlew bootRun
```