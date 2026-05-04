import type { BankRegistryEntry } from './types';
import { ubs } from './ubs';

export const BANK_REGISTRY: Record<string, BankRegistryEntry> = {
    [ubs.slug]: ubs,
};

export function getBank(slug: string): BankRegistryEntry | undefined {
    return BANK_REGISTRY[slug];
}
