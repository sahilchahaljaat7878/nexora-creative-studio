import { LegalPage } from "@/pages/LegalPage";
import { privacyPolicy } from "@/config/legal";

export default function PrivacyPolicyPage() {
  return <LegalPage document={privacyPolicy} type="privacy" />;
}
