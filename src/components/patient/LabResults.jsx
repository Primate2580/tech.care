import { downloadTextFile } from '../../lib/download.js';
import { slugify } from '../../lib/patients.js';
import downloadIcon from '../../assets/icons/download.png';

// The API only returns the names of lab results, so the download is a placeholder report.
function downloadResult(patientName, resultName) {
  const content = [
    'Tech.Care - Lab result',
    '',
    `Patient: ${patientName}`,
    `Result: ${resultName}`,
    `Generated: ${new Date().toLocaleString('en-US')}`,
    '',
    'The Patient Data API provides only the name of each lab result,',
    'so this file stands in for the full report.',
  ].join('\n');
  downloadTextFile(`${slugify(patientName)}-${slugify(resultName)}.txt`, content);
}

export default function LabResults({ patientName, results = [] }) {
  return (
    <section
      aria-labelledby="lab-results-title"
      className="card flex max-h-[360px] flex-col pb-5 pl-5 pr-[21px] pt-[21px] xl:h-[296px] xl:max-h-none"
    >
      <h2 id="lab-results-title" className="text-card-title">
        Lab Results
      </h2>
      {results.length === 0 ? (
        <p className="mt-4 text-muted">No lab results yet.</p>
      ) : (
        <ul className="scroll-thin mt-4 flex min-h-0 flex-1 flex-col gap-[5px] overflow-y-auto pr-1.5">
          {results.map((name, index) => (
            <li
              key={`${name}-${index}`}
              className="flex h-10 shrink-0 items-center justify-between rounded-lg px-4 hover:bg-page"
            >
              <span>{name}</span>
              <button type="button" aria-label={`Download ${name}`} onClick={() => downloadResult(patientName, name)}>
                <img src={downloadIcon} alt="" width="20" height="20" />
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
