export const PHONE_NUMBER_LENGTH = 11;

export function formatPhoneNumber(phone: string): string {
    // Remove todos os caracteres que não são dígitos
    const digits = phone.replace(/\D/g, '').slice(0, PHONE_NUMBER_LENGTH); // Limita a 11 dígitos

    if (digits.length === 0) {
        return '';
    }
    if (digits.length <= 2) {
        return `(${digits}`;
    }
    if (digits.length <= 7) {
        return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    }

    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
}

export function normalizePhoneNumber(phone: string): string {
    // Remove todos os caracteres que não são dígitos
    return phone.replace(/\D/g, '').slice(0, PHONE_NUMBER_LENGTH); // Limita a 11 dígitos
}
