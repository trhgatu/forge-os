export function toEnum<T extends Record<string, string>>(
  enumObj: T,
  value: string | undefined | null,
  defaultValue: T[keyof T],
): T[keyof T] {
  if (!value) return defaultValue;

  const enumValues = Object.values(enumObj) as string[];

  if (enumValues.includes(value)) {
    return value as unknown as T[keyof T];
  }

  return defaultValue;
}
