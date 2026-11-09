import Image, { type ImageProps } from "next/image";
import { getImage, imageSrc } from "@/data/images";

type PhotoProps = Omit<ImageProps, "src" | "alt" | "width" | "height"> & {
  /** Image path from the registry, e.g. "wedding/couple-sofa". */
  path: string;
  alt?: string;
  /** Fill the parent box (parent must be positioned). Otherwise the photo uses its real dimensions. */
  fill?: boolean;
};

/** A site photo with its registry alt text. */
export function Photo({ path, alt, fill, ...rest }: PhotoProps) {
  const asset = getImage(path);
  if (fill) return <Image src={imageSrc(path)} alt={alt ?? asset.alt} fill quality={90} {...rest} />;
  return <Image src={imageSrc(path)} alt={alt ?? asset.alt} width={asset.width} height={asset.height} quality={90} {...rest} />;
}
