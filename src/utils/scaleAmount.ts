function parseFractionOrNumber(raw: string): number | null {
  const cleaned = raw.trim();
  if (!cleaned) return null;

  // Mixed fraction, e.g. "1 1/2"
  const mixedMatch = cleaned.match(/^(\d+)\s+(\d+)\/(\d+)$/);
  if (mixedMatch) {
    const whole = Number(mixedMatch[1]);
    const num = Number(mixedMatch[2]);
    const den = Number(mixedMatch[3]);
    return den ? whole + num / den : null;
  }

  // Simple fraction, e.g. "1/2" or "3/4"
  const fracMatch = cleaned.match(/^(\d+)\/(\d+)$/);
  if (fracMatch) {
    const num = Number(fracMatch[1]);
    const den = Number(fracMatch[2]);
    return den ? num / den : null;
  }

  // Integer or decimal, e.g. "2" or "1.5"
  const num = Number(cleaned);
  return Number.isFinite(num) ? num : null;
}

function formatOunces(value: number): string {
  // Round to nearest 1/8 oz for clean bar measurements
  const eighths = Math.round(value * 8);
  const whole = Math.floor(eighths / 8);
  const remEighths = eighths % 8;

  const fractionMap: Record<number, string> = {
    1: '1/8',
    2: '1/4',
    3: '3/8',
    4: '1/2',
    5: '5/8',
    6: '3/4',
    7: '7/8',
  };

  if (remEighths === 0) {
    return `${whole}`;
  }
  return whole > 0 ? `${whole} ${fractionMap[remEighths]}` : fractionMap[remEighths];
}

export function scaleAmount(amount: string, multiplier: number): string {
  if (multiplier === 1) return amount;

  // Match leading number/fraction followed by "oz" (e.g., "1 1/2 oz", "Float 1 oz")
  const ozMatch = amount.match(/^(.*?)(\d+\s+\d+\/\d+|\d+\/\d+|\d+(?:\.\d+)?)\s*oz\b(.*)$/i);
  if (ozMatch) {
    const prefix = ozMatch[1];
    const parsed = parseFractionOrNumber(ozMatch[2]);
    const suffix = ozMatch[3];

    if (parsed !== null) {
      const scaled = parsed * multiplier;
      return `${prefix}${formatOunces(scaled)} oz${suffix}`;
    }
  }

  // Optional: scale plain countable items like "8" mint leaves or "2" portions
  const countMatch = amount.match(/^(\d+(?:\.\d+)?)$/);
  if (countMatch) {
    const num = Number(countMatch[1]) * multiplier;
    return Number.isInteger(num) ? String(num) : num.toFixed(1);
  }

  return amount;
}