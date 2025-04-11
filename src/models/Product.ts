export default interface Product {
    productId?: string,
    name?: string,
    stock?: boolean,
    category?: string,
    topItem?: boolean,
    description?: string,
    unitPrice?: number,
    unitMeasured?: number,
    imageList?: Array<string> | Array<File>
}