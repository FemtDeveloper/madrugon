export const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('es-la', {
        style: 'decimal',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(value);
};