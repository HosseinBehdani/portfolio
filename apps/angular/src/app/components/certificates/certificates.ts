import { Component, inject } from '@angular/core';
import { LanguageService } from '../../services/language.service';
import { toPersianDigits } from '../../utils/persian-digits';

@Component({
    selector: 'app-certificates',
    standalone: true,
    imports: [],
    templateUrl: './certificates.html',
    styleUrl: './certificates.css'
})
export class CertificatesComponent {
    readonly languageService = inject(LanguageService);

    toLocaleYear(year: number): string {
        if (this.languageService.language() === 'fa') {
            const persianYear = year - 621;

            return toPersianDigits(persianYear.toString());
        }

        return year.toString();
    }
}