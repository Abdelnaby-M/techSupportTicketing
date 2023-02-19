export default class Guard {
    public static againstNullOrUndefined(value: any): boolean {
        if (value === null || value === undefined) {
            return false;
        }
        return true;
    }

    public static valueOrNUll(value: any): boolean {
       return value || null;
    }

    public static isBoolean(value: any): boolean {
        return typeof value === 'boolean';
    }

    public static isNumeric(value: any): boolean {
        return typeof value === 'number';
    }

    public static isString(value: any): boolean {
        return typeof value === 'string';
    }
}
