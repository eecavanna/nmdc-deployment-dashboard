import React from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { formatRelative, formatDistanceToNow, formatISO } from "date-fns";

interface Props {
  baseDate: Date;
  timestampStr: string;
}

const Timestamp: React.FC<Props> = ({ timestampStr, baseDate }) => {
  // Format the timestamp as "Today at 04:30 PM".
  // Reference: https://date-fns.org/v3.6.0/docs/formatRelative
  const relativeDateStr: string = formatRelative(timestampStr, baseDate);
  const relativeDateStrCapitalized =
    relativeDateStr.charAt(0).toUpperCase() + relativeDateStr.slice(1);

  // Format the timestamp as "2024-04-17T16:30:00Z".
  // Reference: https://date-fns.org/v3.6.0/docs/formatISO
  const isoDateStr: string = formatISO(timestampStr);

  // Format the timestamp as "10 minutes ago".
  // Reference: https://date-fns.org/v3.6.0/docs/formatDistanceToNow
  const distanceToNowStr = formatDistanceToNow(timestampStr, {
    addSuffix: true,
  });

  return (
    <OverlayTrigger
      overlay={
        <Popover>
          <Popover.Body>
            This was <strong>{distanceToNowStr}</strong>, at
            <br />
            <samp>{isoDateStr}</samp>.
          </Popover.Body>
        </Popover>
      }
    >
      <span>{relativeDateStrCapitalized}</span>
    </OverlayTrigger>
  );
};

export default Timestamp;
