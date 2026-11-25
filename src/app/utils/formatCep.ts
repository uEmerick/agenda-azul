export function formatCep(cep: string): string {
    const digits = cep.replace(/\D/g, '').slice(0, 8); // Limita a 8 dígitos

    if (digits.length <= 5) {
        return digits;
    }
    return digits.slice(0, 5) + "-" + digits.slice(5);
}