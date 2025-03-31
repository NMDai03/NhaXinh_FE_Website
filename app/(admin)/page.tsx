import Orders from "@/components/features/orders/orders";

export default function Dashboard() {
  return (
    <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
      <Orders />
    </main>
  );
}
