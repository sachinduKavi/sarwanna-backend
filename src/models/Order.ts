export default interface Order {
    orderId?: string;
    datetime: string;
    note: string,
    status?: boolean,
    customerId?: string,
}
