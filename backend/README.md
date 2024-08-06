# The Backend Application of the App

## Design Pattern

This project follows SOLID principles and Repository design pattern. Every entities has a handler/controller, service, and repository each has its own function (SRP).

- Handler / Controller, Used to process HTTP request, request validation, etc.
- Service, Used to process business logic.
- Repository, Used as a bridge connecting the app with the Mongoose ODM.