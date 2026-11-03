import { useMemo, useState } from 'react';
import { lastMonths, latestEntry, toChartSeries } from '../../lib/history.js';
import BloodPressureChart from './BloodPressureChart.jsx';
import LevelText from './LevelText.jsx';
import { useSettings } from '../../hooks/useSettings.js';
import { formatTemperature } from '../../lib/temperature.js';
import chevronDown from '../../assets/icons/chevron-down.png';
import respiratoryIcon from '../../assets/images/vital-respiratory.png';
import temperatureIcon from '../../assets/images/vital-temperature.png';
import heartIcon from '../../assets/images/vital-heart.png';

const RANGES = [3, 6, 12]; // months

function Reading({ label, dotClass, value, level, className = '' }) {
  return (
    <div className={className}>
      <dt className="flex items-center gap-2 font-bold">
        <span className={`size-[14px] rounded-full ${dotClass}`} aria-hidden="true" />
        {label}
      </dt>
      <dd className="mt-[10px] text-[22px] font-extrabold leading-[30px]">{value}</dd>
      <dd className="mt-2 flex items-center gap-2">
        <LevelText level={level} />
      </dd>
    </div>
  );
}

function VitalCard({ label, value, level, icon, bgClass }) {
  return (
    <li className={`rounded-xl p-4 md:h-[238px] ${bgClass}`}>
      <img src={icon} alt="" width="96" height="96" />
      <h3 className="mt-4">{label}</h3>
      <p className="text-[30px] font-extrabold leading-[41px]">{value}</p>
      <p className="mt-[18px] flex items-center gap-2">
        <LevelText level={level} />
      </p>
    </li>
  );
}

export default function DiagnosisHistory({ history = [] }) {
  const [months, setMonths] = useState(6);
  const { temperatureUnit } = useSettings();
  const series = useMemo(() => toChartSeries(lastMonths(history, months)), [history, months]);
  const latest = latestEntry(history);

  return (
    <section aria-labelledby="diagnosis-history-title" className="card px-5 pb-[23px] pt-[22px]">
      <h2 id="diagnosis-history-title" className="text-card-title">
        Diagnosis History
      </h2>

      {!latest ? (
        <p className="mt-6 text-muted">No readings have been recorded for this patient.</p>
      ) : (
        <>
          <div className="mt-[39px] grid grid-cols-1 gap-[18px] rounded-xl bg-bp-panel p-4 md:h-[298px] md:grid-cols-[1fr_206px]">
            <div className="flex min-h-[240px] min-w-0 flex-col">
              <div className="flex items-center justify-between">
                <h3 className="text-inner-title">Blood Pressure</h3>
                <div className="relative mr-7">
                  <label htmlFor="bp-range" className="sr-only">
                    Blood pressure time range
                  </label>
                  <select
                    id="bp-range"
                    value={months}
                    onChange={(event) => setMonths(Number(event.target.value))}
                    className="cursor-pointer appearance-none bg-transparent pr-5"
                  >
                    {RANGES.map((range) => (
                      <option key={range} value={range}>
                        Last {range} months
                      </option>
                    ))}
                  </select>
                  <img
                    src={chevronDown}
                    alt=""
                    width="11"
                    height="6"
                    className="pointer-events-none absolute right-0 top-1/2 -translate-y-1/2"
                  />
                </div>
              </div>
              <div className="relative mt-3 min-h-0 flex-1">
                <BloodPressureChart series={series} />
              </div>
            </div>

            <dl className="flex flex-col pt-1">
              <Reading
                label="Systolic"
                dotClass="bg-systolic"
                value={latest.blood_pressure.systolic.value}
                level={latest.blood_pressure.systolic.levels}
                className="border-b border-divider pb-[14px]"
              />
              <Reading
                label="Diastolic"
                dotClass="bg-diastolic"
                value={latest.blood_pressure.diastolic.value}
                level={latest.blood_pressure.diastolic.levels}
                className="pt-[18px]"
              />
            </dl>
          </div>

          <ul className="mt-[22px] grid gap-[22px] md:grid-cols-3">
            <VitalCard
              label="Respiratory Rate"
              value={`${latest.respiratory_rate.value} bpm`}
              level={latest.respiratory_rate.levels}
              icon={respiratoryIcon}
              bgClass="bg-respiratory"
            />
            <VitalCard
              label="Temperature"
              value={formatTemperature(latest.temperature.value, temperatureUnit)}
              level={latest.temperature.levels}
              icon={temperatureIcon}
              bgClass="bg-temperature"
            />
            <VitalCard
              label="Heart Rate"
              value={`${latest.heart_rate.value} bpm`}
              level={latest.heart_rate.levels}
              icon={heartIcon}
              bgClass="bg-heart"
            />
          </ul>
        </>
      )}
    </section>
  );
}
