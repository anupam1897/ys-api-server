# ys-api:  eCommerce API

This is a simple ecommerce api written in JavaScript used for inventory management. It can be integrated with mobile and webapps. For development you can use docker or run it on its own. Follow the steps below for get it up and running.

## Features
- CRUD operations for products and inventory management.
- Basic authentication and user idenitity verificattion provided by [ys-auth](https://github.com/anupam1897/ys-auth-server) repository.
- Integration with a MySQL database

## Usage

### Using Node.js

1. **Clone the repository:**

    ```bash
    git clone https://github.com/anupam1897/ys-api-server.git
    ```

2. **Install dependencies:**

    ```bash
    cd ecommerce-api
    npm install
    ```

3. **Start the server:**

    ```bash
    npm start
    ```

    The server will start running on port 3000.

### Using Docker

1. **Clone the repository:**

    ```bash
    git clone https://github.com/anupam1897/ys-api-server.git
    ```

2. **Build the Docker image:**

    ```bash
    cd ecommerce-api
    docker build -t ecommerce-api .
    ```

3. **Run the Docker container:**

    ```bash
    docker run -p 3000:3000 ecommerce-api
    ```

    The server will start running inside the Docker container on port 3000.

## Contributing

Contributions are welcome! If you have any suggestions or find any bugs, please open an [issue](https://github.com/your-username/ecommerce-api/issues) or submit a [pull request](https://github.com/your-username/ecommerce-api/pulls).

## License

This project is licensed under the [MIT License](LICENSE).
