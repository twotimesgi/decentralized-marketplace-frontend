# Decentralized Marketplace on Venom Blockchain

This decentralized marketplace was developed as part of a hackathon, where it was presented on behalf of **Logyq Protocol**, with contributions from **Luigi Bardella Gerbi (Me)**, acting as a software engineer. **Luca Pedranzini** (CTO) also made smaller contributions to the project.

The marketplace allows users to buy and sell items or services through secure, transparent smart contracts on the Venom blockchain. It empowers both buyers and sellers with full control over transactions, ensuring that all listings and offers are immutably stored and validated on-chain.

## Key Features

### 1. Creating a Listing
Sellers can create listings by providing details such as:
- **Title**: A name for the item or service.
- **Description**: A detailed explanation of what’s being offered.
- **Price**: The cost of the item or service.

Once submitted, the listing is stored on the Venom blockchain, and an event is emitted to notify potential buyers of its availability. Listings are visible to all users in real-time.

### 2. Making Offers
Buyers can make offers on any available listing by:
- Specifying the **amount** they’re willing to pay.
- Submitting the offer through the smart contract.

The smart contract validates that:
- The offer amount is greater than zero.
- The listing exists and is available for purchase.

If the offer matches the seller's price, the smart contract automatically accepts the offer.

### 3. Accepting and Declining Offers
Sellers have the flexibility to:
- **Accept** an offer, marking the listing as sold and triggering a confirmation event.
- **Decline** an offer if it doesn’t meet their requirements, notifying the buyer and freeing the item for other offers.

Both actions emit events that keep the participants and other interested parties updated.

## Tech Stack

- **Next.js**: Framework for the frontend and server-side rendering.
- **TypeScript**: Used throughout the project for type safety.
- **Venom Connect**: Integrates with Venom wallet for blockchain interactions.
- **Google Cloud Platform**: Platform used for deployment and hosting.
- **Chai**: Tests on the smart contracts are performed using **Chai** for assertion.

## Smart Contracts

Smart contracts are written in **T-Sol** (TypeScript Solidity), which manage:
- Listing creation and storage.
- Offer validation and acceptance.
- Transaction finalization between buyer and seller.

### Smart Contract Repository

The smart contracts for this decentralized marketplace can be found in the following repository:
[Contracts](https://github.com/twotimesgi/decentralized-marketplace-contracts).

