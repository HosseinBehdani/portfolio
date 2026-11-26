const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

export function toEnglishDigits(input: string): string {
    return input.replace(/[۰-۹٠-٩]/g, digit => {
        const code = digit.charCodeAt(0);
        const value = code >= 0x06f0 ? code - 0x06f0 : code - 0x0660;

        return String(value);
    });
}

export function toPersianDigits(input: string): string {
    return input.replace(/\d/g, digit => PERSIAN_DIGITS[+digit] ?? digit);
}