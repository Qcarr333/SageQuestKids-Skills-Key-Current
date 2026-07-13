import type { Metadata } from 'next';
import { KeyCurrentGame } from '@/modules/skills/components/games/key-current/KeyCurrentGame';

export const metadata: Metadata = {
  title: 'Key Current — Sage Quest Kids Skills',
  description:
    'Ride the current! Clear the gates by finding the right keys in this Skills Sea keyboard runner.',
};

export default function KeyCurrentPage() {
  return <KeyCurrentGame />;
}
