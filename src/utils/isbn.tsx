export function normalizeISBN(isbn: string): string {
  return isbn.replace(/[-\s]/g, "");
}

export function isValidISBN(isbn: string): boolean {
  const normalized = normalizeISBN(isbn);

  if (normalized.length === 10) {
    return isValidISBN10(normalized);
  }

  if (normalized.length === 13) {
    return isValidISBN13(normalized);
  }

  return false;
}
function isValidISBN10(isbn: string): boolean {
  if (!/^\d{9}[\dX]$/.test(isbn)) {
    return false;
  }

  const sum = [...isbn].reduce((total, digit, index) => {
    const value = digit === "X" ? 10 : Number(digit);
    return total + value * (10 - index);
  }, 0);

  return sum % 11 === 0;
}

function isValidISBN13(isbn: string): boolean {
  if (!/^\d{13}$/.test(isbn)) {
    return false;
  }

  const sum = [...isbn].reduce((total, digit, index) => {
    const value = Number(digit);
    return total + (index % 2 === 0 ? value : value * 3);
  }, 0);

  return sum % 10 === 0;
}
