import { site } from "@/data/site";

/** The studio name with the ampersand picked out in orange. */
export function BrandName() {
  const [first, second] = site.shortName.split("&");
  return (
    <>
      {first}
      <b>&amp;</b>
      {second}
    </>
  );
}
