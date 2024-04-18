import React, { ReactNode } from "react";
import Button from "react-bootstrap/Button";
import Spinner from "react-bootstrap/Spinner";
import Stack from "react-bootstrap/Stack";
import { ArrowRepeat } from "react-bootstrap-icons";

interface Props {
  value: string | undefined;
  refetch: () => void;
  isRefetching: boolean;
  isPending: boolean;
  isError: boolean;

  /* Optional function you can use to format a string value. */
  formatStr?: (value: string) => ReactNode;
}

const ValueIndicator: React.FC<Props> = ({
  value,
  refetch,
  isRefetching,
  isPending,
  isError,
  formatStr,
}) => {
  const isLoading = isPending || isRefetching;

  let formattedValue: ReactNode = value;
  if (typeof formatStr === "function" && typeof value === "string") {
    formattedValue = formatStr(value);
  }

  return (
    <Stack gap={0} direction={"horizontal"}>
      <div className={"flex-grow-1"}>
        {isError ? (
          // TODO: Style the error message/indicator.
          <>Error</>
        ) : (
          <>
            {isLoading ? (
              <Spinner role={"status"} size={"sm"}>
                <span className={"visually-hidden"}>Loading...</span>
              </Spinner>
            ) : (
              formattedValue
            )}
          </>
        )}
      </div>
      <div>
        <Button
          onClick={refetch}
          disabled={isLoading}
          variant={"link"}
          size={"sm"}
          className={"p-0 align-text-bottom"}
          title={"Refresh"}
        >
          <ArrowRepeat />
        </Button>
      </div>
    </Stack>
  );
};

export default ValueIndicator;
