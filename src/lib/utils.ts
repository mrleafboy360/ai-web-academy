export function formatDate(date: string | null | undefined): string {
  if (!date) return "—";
  return new Date(date).toLocaleDateString("en-PK", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export const admissionStatusLabel: Record<string, string> = {
  pending: "Pending Review",
  approved: "Admitted",
  rejected: "Not Admitted",
};
