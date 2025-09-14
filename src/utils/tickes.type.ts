export interface TicketProps {
    id: string;
    name: string;
    status: string;
    description: string | null
    createdAt: Date | null;
    updatedAt: Date | null;
    customerId: string | null;
    userId: string | null;
}