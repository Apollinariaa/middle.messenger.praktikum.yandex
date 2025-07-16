import { RegexKey, regexMap } from './regex';

export function validateInput(name: string, input: HTMLInputElement) {
    const regex = regexMap[name as RegexKey];
    if (!regex.test(input.value)) {
        input.classList.add('validate_error_input');
        return false;
    } else {
        input.classList.remove('validate_error_input');
    }
    return true;
}

export function validateForOptionalFieldsInputs(name: string, input: HTMLInputElement) {
    const regex = regexMap[name as RegexKey];
    if (input.value.length && input.name !== 'avatar') {
        if (!regex.test(input.value)) {
            input.classList.add('validate_error_input');
            return false;
        } else {
            input.classList.remove('validate_error_input');
        }
        return true;
    }
    return true;
}

export function collectFormData(idForm: string) {
    const formData: {[key: string]: string} = {};

    const form = document.querySelector(idForm) as HTMLFormElement;

    const inputs = form?.querySelectorAll('input');
    inputs?.forEach(input => {
        if (input) {
            const name = input.getAttribute('name') || '';
            formData[name] = (input as HTMLInputElement).value;
        }
    });

    return formData;
}


export function validateForm(idForm: string, isFlag: boolean = false) {
    let isValid = true;
    const form = document.querySelector(idForm) as HTMLFormElement;

    const inputs = form?.querySelectorAll('input');
    inputs?.forEach(input => {
        const name = input.getAttribute('name') || 'default';
        const isValidInput = !isFlag ? validateInput(name, input) : validateForOptionalFieldsInputs(name, input);
        isValid = isValid ? isValidInput : isValid;
    });
    return isValid;
}
