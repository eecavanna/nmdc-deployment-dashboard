import React from "react";
import { parseISO, differenceInMinutes, differenceInSeconds } from "date-fns";

interface Props {
  startTimestampISOStr?: string;
  endTimestampISOStr?: string;
  unit?: "seconds" | "minutes";
  isRefetching: boolean;
  isPending: boolean;
}

const Duration: React.FC<Props> = ({
  startTimestampISOStr,
  endTimestampISOStr,
  unit = "minutes",
  isRefetching,
  isPending,
}) => {
  const isLoading = isRefetching || isPending;

  // Normalize date values into Date objects.
  // Note: The `differenceInMinutes` function expects its `dateLeft` parameter to be the later date.
  const dateRight =
    typeof startTimestampISOStr === "string"
      ? parseISO(startTimestampISOStr)
      : null;
  const dateLeft =
    typeof endTimestampISOStr === "string"
      ? parseISO(endTimestampISOStr)
      : null;

  // Compute the difference, at the specified "resolution" (i.e. unit).
  //
  // References:
  // - https://date-fns.org/v3.6.0/docs/differenceInMinutes
  // - https://date-fns.org/v3.6.0/docs/differenceInSeconds
  //
  let numUnits = null;
  if (dateLeft !== null && dateRight !== null) {
    if (unit === "minutes") {
      numUnits = differenceInMinutes(dateLeft, dateRight);
    } else {
      numUnits = differenceInSeconds(dateLeft, dateRight);
    }
  }

  return isLoading ? (
    <span />
  ) : numUnits !== null ? (
    <span>
      {numUnits} {unit}
    </span>
  ) : (
    <span>--</span>
  );
};

export default Duration;
