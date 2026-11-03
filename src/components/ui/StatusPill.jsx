const STYLES = {
  Confirmed: 'bg-green/20',
  Paid: 'bg-green/20',
  Pending: 'bg-orange/20',
  Cancelled: 'bg-temperature',
  Refunded: 'bg-temperature',
};

export default function StatusPill({ status }) {
  return (
    <span className={`inline-block rounded-full px-3 py-1 font-bold ${STYLES[status] ?? 'bg-page'}`}>{status}</span>
  );
}
