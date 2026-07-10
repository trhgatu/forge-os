export interface BiometricProcessor {
  supports(type: string): boolean;
  process(userId: string, payload: any): Promise<void>;
}
