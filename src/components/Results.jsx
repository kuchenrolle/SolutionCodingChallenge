import React from "react";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import { History } from "./History";

export const Results = ({ content, calculations, resetHistory }) => {

  return (
  <Card data-testid="results">
    <CardContent>
      <Typography variant="h5">Results</Typography>
        {content === undefined
        ? <Typography variant="h5" align="center">Wrong input!</Typography>
        : null
        }
      <History calculations={calculations} />
      <Button
          color="primary"
          variant="outlined"
          onClick={resetHistory}
        >
          ERASE RESULTS
      </Button>

    </CardContent>
  </Card>
  )
};
