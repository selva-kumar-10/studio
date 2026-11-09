import { Suspense } from "react";
import { BookingWizard } from "@/components/booking/BookingWizard";
import { emph } from "@/components/ui/Emph";
import { createMetadata } from "@/lib/metadata";

export const metadata = createMetadata({
  title: "Book a session",
  description: "Book a photo, film or podcast session in Chennai in three quick steps. Your request goes to the studio on WhatsApp.",
  path: "/book",
});

export default function BookPage() {
  return (
    <div className="wrap">
      <div className="pagehead hide-m">
        <span className="eyebrow mono hide-t">Book a session</span>
        <h1 className="h1">{emph("Plan your *shoot*")}</h1>
        <p className="lead">Three quick choices. We reply on WhatsApp within the hour.</p>
      </div>
      <div className="book-wrap">
        <Suspense fallback={null}>
          <BookingWizard />
        </Suspense>
      </div>
    </div>
  );
}
