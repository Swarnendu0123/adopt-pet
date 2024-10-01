# Adopt-Pet: A Blockchain Based Pet Adopting Platform

[![License](https://img.shields.io/github/license/Swarnendu0123/adopt-pet)](https://github.com/Swarnendu0123/adopt-pet/blob/main/LICENSE)  
[![Issues](https://img.shields.io/github/issues/Swarnendu0123/adopt-pet)](https://github.com/Swarnendu0123/adopt-pet/issues)  
[![Contributors](https://img.shields.io/github/contributors/Swarnendu0123/adopt-pet)](https://github.com/Swarnendu0123/adopt-pet/graphs/contributors)

## Overview

Adopt-Pet is a decentralized platform that leverages blockchain technology to facilitate the adoption of pets. This platform ensures transparency, security, and trust in the adoption process by creating an immutable ledger of adoption transactions.

The goal of this project is to provide a safe and transparent way for potential pet adopters to find and adopt pets, while ensuring that all parties involved adhere to ethical standards.

## Tech Stack

- **Vite**: Fast and optimized front-end build tool that provides instant Hot Module Replacement (HMR) and fast builds for React.
- **React.js**: Front-end JavaScript library for building user interfaces.
- **Solidity**: A language for writing smart contracts that run on Ethereum.
- **Web3.js**: Allows for interaction with the Ethereum blockchain from JavaScript applications.
- **IPFS**: Used for decentralized file storage to manage pet data and listings.
- **Node.js & Express.js**: Back-end technologies for managing server-side functionality.
- **MongoDB**: Database used for storing non-blockchain-related data (e.g., user profiles, pet details).
- **ESLint**: Provides linting for JavaScript code to ensure clean and error-free development.

## Features

- **Blockchain-Powered**: Utilizes smart contracts written in Solidity to secure and verify pet adoption transactions.
- **Decentralized Platform**: Removes the need for intermediaries, allowing for a transparent and secure interaction between adopters and pet owners.
- **Pet Listings**: Browse available pets for adoption and view details securely stored on IPFS.
- **Adoption History**: Track the history of pets that have been adopted through the platform.
- **User Verification**: Pet owners and adopters are verified through the platform, adding an extra layer of trust.
- **Fast Development Setup**: Using Vite with React ensures fast hot reloading and easy project setup, while ESLint ensures clean and maintainable code.

## How It Works

1. **Pet Owners**: Register and list their pets for adoption, with details such as breed, age, and health stored in decentralized storage (IPFS).
2. **Adopters**: Browse the listed pets and choose a pet to adopt.
3. **Smart Contract Execution**: A smart contract (written in Solidity) is generated between the adopter and pet owner, ensuring a transparent and immutable record of the adoption.
4. **Completion**: Once the contract is signed and verified, the adoption process is completed on the Ethereum blockchain.

## Installation

This template provides a minimal setup to get React working in Vite with Hot Module Replacement (HMR) and some ESLint rules for clean code.

1. Clone the repository:

   ```bash
   git clone https://github.com/Swarnendu0123/adopt-pet.git
   ```

2. Navigate to the project directory:

   ```bash
   cd adopt-pet
   ```

3. Install the required dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. To compile and deploy smart contracts:

   ```bash
   cd blockchain
   npx hardhat compile
   ```

6. Deploy contracts to a test network (like Rinkeby):

   ```bash
   npx hardhat run scripts/deploy.js --network rinkeby
   ```

## Usage

1. Browse pets available for adoption via the platform.
2. Create an account or log in to list your pet for adoption.
3. Complete the adoption transaction on the blockchain using your Ethereum wallet.

## Contributing

Contributions are welcome! If you want to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature-name`).
3. Commit your changes (`git commit -m 'Add your feature'`).
4. Push to the branch (`git push origin feature/your-feature-name`).
5. Create a Pull Request.

Please ensure that your code adheres to the provided ESLint rules and follows the [Code of Conduct](CODE_OF_CONDUCT.md).

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

For any questions or support, feel free to contact:

- Project Maintainer: [Swarnendu0123](https://github.com/Swarnendu0123)
