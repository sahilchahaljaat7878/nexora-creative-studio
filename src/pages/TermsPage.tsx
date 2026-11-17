import { LegalPage } from "@/pages/LegalPage";
import { termsAndConditions } from "@/config/legal";

export default function TermsPage() {
  return <LegalPage document={termsAndConditions} type="terms" />;
}
