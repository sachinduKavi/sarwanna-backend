export default interface Order {
    orderId?: string;
    dateTime: string;
    note: string,
    status?: boolean,
    customerId?: string,
}
