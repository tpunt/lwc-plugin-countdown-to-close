export function calculatePriceDelta(price: number, priceDelta: string): number {
    if (priceDelta === '') {
        return price;
    }

	if (priceDelta.endsWith('%')) {
		const percentage = parseFloat(priceDelta.slice(0, -1)) / 100;

		return price + (price * percentage);
	}

	return price + parseFloat(priceDelta);
}