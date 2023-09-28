export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <main className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8 bg-gray-100">
      {children}
    </main>
  );
}
