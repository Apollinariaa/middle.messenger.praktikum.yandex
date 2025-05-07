import { RegexKey, regexMap } from "../utils/regex";

class BaseController {
    public form;

    constructor(formSelector: string) {
        this.form = document.querySelector(formSelector);
        this.initEventListeners();
    }

    initEventListeners() {
        if (this.form) {
            const inputs = this.form.querySelectorAll('input, textarea, select');
            inputs.forEach(input => {
                input.addEventListener('blur',
                (event) => {
                    const target = event.target as HTMLInputElement;
                    this.validateField(input, target.value);
                })
            });

            this.form.addEventListener('submit', (event) => {
                event.preventDefault();
                if (this.isValidForm()) {
                    const formData = this.collectFormData();
                    console.log(formData);
                }
            });
        }
    }

    isValidForm() {
        const inputs = this.form?.querySelectorAll('input, textarea, select');

        let isValid = true;

        inputs?.forEach(input => {
            const value = (input as HTMLInputElement | HTMLTextAreaElement).value;

            const isValidInput = this.validateField(input, value);
            isValid = isValid ? isValidInput : isValid;
        });
        return isValid;
    }

    validateField(input: Element, event: string) {
        const name = input.getAttribute('name') || 'default';
        const regex = regexMap[name as RegexKey];
        if (!regex.test(event)) {
            input.classList.add('validate_error_input');
            return false;
        } else {
            input.classList.remove('validate_error_input');
        }
        return true;
    }

    validateForm(event: string) {
        const inputs = this.form?.querySelectorAll('input, textarea, select');
        let isValid = true;

        inputs?.forEach(input => {
            const isValidField = this.validateField(input, event);
            isValid = isValid ? isValidField : isValid;
        });

        return isValid;
    }

    collectFormData() {
        const formData: {[key: string]: string} = {};
        const inputs = this.form?.querySelectorAll('input, textarea, select');

        inputs?.forEach(input => {
            if (input) {
                const name = input.getAttribute('name') || '';
                formData[name] = (input as HTMLInputElement | HTMLTextAreaElement).value;
            }
        });

        return formData;
    }
}

export default BaseController;
