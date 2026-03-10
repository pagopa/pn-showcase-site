import { NextApiResponse } from "next";

import { Typography } from "@mui/material";

type Props = Readonly<{ statusCode: string }>;

export default function Error({ statusCode }: Props) {
  return (
    <Typography variant="body1">
      {statusCode
        ? `An error ${statusCode} occurred on server`
        : "An error occurred on client"}
    </Typography>
  );
}

Error.getInitialProps = ({
  res,
  err,
}: {
  res: NextApiResponse;
  err: { statusCode: number };
}) => {
  const errorCode = err ? err.statusCode : 404;
  const statusCode = res ? res.statusCode : errorCode;
  return { statusCode };
};
