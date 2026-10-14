const PERSIAN_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

/**
 * Replaces each ASCII digit (0-9) in `input` with its Persian numeral.
 *
 * `noUncheckedIndexedAccess` types string index access as `string | undefined`,
 * so we coalesce back to the matched character. The `\d` match guarantees the
 * index is 0-9 (in range for PERSIAN_DIGITS), so the fallback never fires at
 * runtime — it satisfies the compiler and degrades gracefully if it ever did.
 */
export function toPersianDigits(input: string): string {
    return input.replace(/\d/g, digit => PERSIAN_DIGITS[+digit] ?? digit);
}
