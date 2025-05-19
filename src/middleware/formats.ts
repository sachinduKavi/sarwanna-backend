export function currencyFormat(amount: number) {
    if(typeof amount !== 'number') return 0;
    // Format the amount to 2 decimal places
    let formattedAmount = amount.toFixed(2).toString()
    // Add commas to the amount
    formattedAmount = formattedAmount.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    return formattedAmount
}