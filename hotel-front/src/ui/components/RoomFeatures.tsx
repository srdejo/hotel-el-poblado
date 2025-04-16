import { Link, Typography } from "@mui/material";
import { useState } from "react";

  type Props = {
    doubleBed?: number;
    singleBed?: number;
    bunkBed?: number;
    airConditioning?: boolean;
    balconyView?: boolean;
    jacuzzi?: boolean;
  };
  
export default function RoomFeatures({
    doubleBed = 0,
    singleBed = 0,
    bunkBed = 0,
    airConditioning,
    balconyView,
    jacuzzi,
  }: Props) {

    const [showFull, setShowFull] = useState(false);
    const features: string[] = [];

    if (doubleBed > 0) features.push(pluralize(doubleBed, "cama doble", "camas dobles"));
    if (singleBed > 0) features.push(pluralize(singleBed, "cama sencilla", "camas sencillas"));
    if (bunkBed > 0) features.push(pluralize(bunkBed, "camarote", "camarotes"));
    if (balconyView) features.push("mirador");
    if (airConditioning) features.push("aire acondicionado");
    if (jacuzzi) features.push("jacuzzi");
  
    const fullText  = features.join(", ");
    const maxLength = 23;
  
    const shouldTruncate = fullText.length > maxLength;
    const displayedText = showFull || !shouldTruncate
    ? fullText
    : fullText.slice(0, maxLength).trimEnd() + "...";
  
    return (
      <Typography variant="body2" color="text.secondary" component="span">
      {displayedText}
      {shouldTruncate && (
        <>
          {" "}
          <Link
            component="button"
            onClick={() => setShowFull(!showFull)}
            underline="hover"
            color="primary"
            sx={{ fontSize: "0.875rem", ml: 0.5 }}
          >
            {showFull ? "ver menos" : "ver más"}
          </Link>
        </>
      )}
    </Typography>
    );
  }
  
function pluralize(count: number, singular: string, plural: string) {
  return `${count} ${count === 1 ? singular : plural}`;
}
