# Basic Auth CRUD with golang + Nextjs

## Features

- Login
- Register
- CRUD

## Require Installation

`Frontend`

- requires [Nextjs](https://nextjs.org/) v14+ for frontend
- requires [Ts-Node](https://www.npmjs.com/package/ts-node) v14+ for

`Backend`

- requires [Golang](https://go.dev/) v1.21.3+ for backebnd
- requires [Air live reload](https://github.com/cosmtrek/air) to run backend.

`Database`

- requires [Postgresql](https://www.postgresql.org/) v16 for database.

## Config

- Create Database
- set config env.yaml file on backend
- set config .env file on frontend
- install node package module

```sh
npm install
```

- `Seeding database (Optional)`

```sh
go run .\scripts\seed.go
```

## How to run

`Frontend`

```sh
npm run dev
```

`Backend`

```sh
air
```

`or`

```sh
go run .\app\main.go
```

# example

`Frontend`

```sh
http://localhost:3000
```

`Backend`

```sh
http://localhost:8000/api/abouts
```

## Docker

to install and deploy in a Docker container.

By default, the Docker will expose port 8000, so change this within the
Dockerfile if necessary. When ready, simply use the Dockerfile to
build the image.

```sh
docker build -t <image-name> .
```

This will create the image and pull in the necessary dependencies.

Once done, run the Docker image and map the port to whatever you wish on
your host. In this example, we simply map port 8000 of the host to
port 8000 of the Docker (or whatever port was exposed in the Dockerfile):

```sh
docker run --rm -p 8000:8000 -d --name [container-name] [image-name]
```

[![pptsuwit](https://avatars.githubusercontent.com/u/90542847?v=4)](https://github.com/pptsuwit)

[pkg1]: https://pkg.go.dev/github.com/go-playground/validator/v10
[pkg2]: https://pkg.go.dev/github.com/gofiber/fiber@v1.14.6
[pkg3]: https://pkg.go.dev/github.com/gofiber/fiber/v2@v2.51.0
[pkg4]: https://pkg.go.dev/github.com/gofiber/jwt/v2@v2.2.7
[pkg5]: https://pkg.go.dev/github.com/golang-jwt/jwt@v3.2.2+incompatible
[pkg6]: https://pkg.go.dev/github.com/spf13/viper@v1.17.0
[pkg7]: https://pkg.go.dev/go.uber.org/zap@v1.26.0
[pkg8]: https://pkg.go.dev/golang.org/x/crypto@v0.15.0
[pkg9]: https://pkg.go.dev/gorm.io/driver/postgres@v1.5.4
[pkg10]: https://pkg.go.dev/gorm.io/gorm@v1.25.5
