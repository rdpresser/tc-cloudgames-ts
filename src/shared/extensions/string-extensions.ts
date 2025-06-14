import { validate as uuidValidate, version as uuidVersion } from 'uuid';

export function joinWithQuotes(list: ReadonlySet<string>): string {
  if (!list || list.size === 0) {
    return '';
  }

  return Array.from(list)
    .map((r) => `'${r}'`)
    .join(', ');
}

export function joinArrayWithQuotes(list: string[]): string {
  if (!list || list.length === 0) {
    return '';
  }

  return list.map((r) => `'${r}'`).join(', ');
}

export function isNullOrEmpty(value?: string | null | undefined): boolean {
  return (
    value == null ||
    value === undefined ||
    value.trim() === '' ||
    value.trim() === 'null' ||
    value.trim() === 'undefined'
  );
}

export function isNullOrEmptyOrInvalidUuid(value?: string | null | undefined): boolean {
  if (isNullOrEmpty(value)) {
    return true;
  }

  const trimmed = value!.trim();
  const defaultUuid = '00000000-0000-0000-0000-000000000000';

  // Use built-in uuidValidate and uuidVersion for validation
  return !uuidValidate(trimmed) || uuidVersion(trimmed) !== 4 || trimmed === defaultUuid;
}
