export class Utils {

    static create_array = (total: number, numero: number) => Array.from(Array(total), () => Utils.number_random(numero));

    static number_random = (number: number) => (Math.round(Math.random() * number));

    static mod = (dividendo: number, divisor: number) => Math.round(dividendo - (Math.floor(dividendo / divisor) * divisor));

}
