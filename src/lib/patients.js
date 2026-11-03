/** "Jessica Taylor" -> "jessica-taylor" (used in URLs like /patients/jessica-taylor). */
export const slugify = (name) =>
  name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');

export const findBySlug = (patients, slug) => patients.find((p) => slugify(p.name) === slug);

/** Mock data refers to patients by position; this wraps around so a link always resolves. */
export const patientAt = (patients, index) => patients[index % patients.length];
