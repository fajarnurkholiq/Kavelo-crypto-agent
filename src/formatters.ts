/**
 * Kumpulan fungsi format tampilan angka.
 * Dipisah dari komponen supaya bisa dipakai ulang (dashboard, asset page, dll).
 */

/** Format harga USD, otomatis pakai lebih banyak desimal untuk harga kecil. */
export function formatPrice(value: number): string {
  const decimals = value < 1 ? 4 : 2;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/** Format persen perubahan harga, selalu tampilkan tanda +/-. */
export function formatPercent(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(2)}%`;
}

/** Format angka besar (market cap, volume) jadi bentuk ringkas: 1.2B, 450M, dst. */
export function formatCompactNumber(value: number): string {
  return new Intl.NumberFormat("en-US", {
    notation: "compact",
    maximumFractionDigits: 2,
  }).format(value);
}

/** Helper untuk kelas warna Tailwind sesuai arah perubahan harga. */
export function priceChangeColorClass(value: number): string {
  if (value > 0) return "text-emerald-500";
  if (value < 0) return "text-rose-500";
  return "text-neutral-400";
}
