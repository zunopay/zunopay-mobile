import { Currency } from "@/types/payment";

export interface Receiver {
    id: string; // encoded Iban or upi id (depends on qr provider)
    walletAddress: string; // Mapped wallet address
    vpa: string; // Mapped wallet address
    name: string;
    currency: Currency;
}
