export class Helpers{
    public static PriceNormalizer(price: string){
        var priceNormalizer
        priceNormalizer = price.split("$")
        return parseFloat(priceNormalizer[1])
    }
}