export default function DiagnosticList({ items = [] }) {
  return (
    <section
      aria-labelledby="diagnostic-list-title"
      className="card flex max-h-[420px] flex-col px-5 pb-4 pt-[22px] lg:h-[349px] lg:max-h-none"
    >
      <h2 id="diagnostic-list-title" className="text-card-title">
        Diagnostic List
      </h2>

      {items.length === 0 ? (
        <p className="mt-6 text-muted">No diagnoses have been recorded for this patient.</p>
      ) : (
        <div role="table" aria-labelledby="diagnostic-list-title" className="mt-10 flex min-h-0 flex-1 flex-col">
          <div role="row" className="diagnostic-grid h-[46px] shrink-0 items-center rounded-full bg-page font-bold">
            <div role="columnheader" className="pl-4">Problem/Diagnosis</div>
            <div role="columnheader">Description</div>
            <div role="columnheader">Status</div>
          </div>
          <div role="rowgroup" className="scroll-thin mt-[14px] min-h-0 flex-1 overflow-y-auto">
            {items.map((item, index) => (
              <div key={`${item.name}-${index}`} role="row" className="diagnostic-grid min-h-[51px] items-center">
                <div role="cell" className="pl-4">{item.name}</div>
                <div role="cell">{item.description}</div>
                <div role="cell">{item.status}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
