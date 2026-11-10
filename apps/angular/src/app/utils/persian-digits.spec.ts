import { toEnglishDigits, toPersianDigits } from './persian-digits';

describe('digit localization', () => {
    it('converts Persian and Arabic-Indic digits to English digits', () => {
        expect(toEnglishDigits('۱۴۰۳ / ١٢٣')).toBe('1403 / 123');
    });

    it('converts English digits to Persian digits', () => {
        expect(toPersianDigits('1403 / 123')).toBe('۱۴۰۳ / ۱۲۳');
    });

    it('preserves non-digit characters', () => {
        expect(toEnglishDigits('+۹۸ (۰۹۱۲)')).toBe('+98 (0912)');
    });
});
