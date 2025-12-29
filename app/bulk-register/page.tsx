import { Header } from '@/components/bns/Header';
import { BulkRegistration } from '@/components/bns/BulkRegistration';

export default function BulkRegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bulk Registration</h1>
          <p className="text-gray-600">
            Register multiple BNS domains at once to save time
          </p>
        </div>

        <div className="max-w-3xl">
          <BulkRegistration />
        </div>
      </main>
    </div>
  );
}
