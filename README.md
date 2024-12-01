# NestJS Monorepo

This repository is a **NestJS Monorepo** designed for a scalable microservices architecture. The project is divided into multiple services and shared libraries, enabling modular development and efficient code sharing.

---

## **Table of Contents**
- [Overview](#overview)
- [Monorepo Structure](#monorepo-structure)
- [Getting Started](#getting-started)
- [Scripts](#scripts)
- [Services](#services)
- [Libraries](#libraries)
- [Development Workflow](#development-workflow)
- [Contributing](#contributing)
- [License](#license)

---

## **Overview**
This project is built using the **NestJS** framework and follows a modular architecture. The monorepo structure supports multiple independent services (applications) and shared libraries, making it ideal for developing a microservices-based ecosystem.

Key Features:
- Modular service design
- Shared libraries for common functionality
- Hot-reloading with Webpack
- Configurable environment files for each service
- Scalable architecture for future growth

---

## **Monorepo Structure**
The repository is structured as follows:

```bash
apps/                # Applications
  api-gateway/       # API Gateway for communication between services
  auth/              # Authentication and user management
  products/          # Product management service
  order/             # Order management service
  payment/           # Payment handling service
  cart/              # Shopping cart service
  notification/      # Notification service

libs/                # Shared libraries
  common/            # Common utilities and modules shared across services

nest-cli.json        # Configuration file for Nest CLI
tsconfig.json        # TypeScript configuration
package.json         # Project metadata and scripts

```

## **How to start each App**
On the Root directory, The nest-cli.json file is a configuration file used by the Nest CLI to manage the structure, build, and startup behavior of a NestJS application. It allows you to define settings for your project, especially useful in monorepo setups.

### ***To Start a Specific Service***
To start an individual service, use the nest start command followed by the service name. For example:

#### **API Gateway:**

```
  nest start api-gateway
```
