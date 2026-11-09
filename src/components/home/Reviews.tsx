import { reviews } from "@/data/home";
import { site } from "@/data/site";

function initials(name: string) {
  return name
    .split(/\s+and\s+|\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

export function ReviewCard({ index = 0, className }: { index?: number; className?: string }) {
  const review = reviews[index];
  return (
    <div className={className ? `card mist review-card ${className}` : "card mist review-card"} data-reveal>
      <span className="mono">
        Google {site.rating} / {site.reviewsCount} reviews
      </span>
      <p>{review.quote}</p>
      <div className="who">
        <span className="avatar">{initials(review.name)}</span>
        <div>
          <b style={{ display: "block", fontSize: 15 }}>{review.name}</b>
          <span className="mut" style={{ fontSize: 13.5 }}>
            {review.context}
          </span>
        </div>
      </div>
    </div>
  );
}

/** Three reviews side by side, desktop only. */
export function ReviewsRow() {
  return (
    <div className="reviews3">
      {reviews.map((_, index) => (
        <ReviewCard key={index} index={index} />
      ))}
    </div>
  );
}
