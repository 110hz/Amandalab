import type { Metadata } from 'next';
import AdminContent from '@/components/AdminContent';

export const metadata: Metadata = {
  title: 'Admin',
};

export default function AdminPage() {
  return <AdminContent />;
}
