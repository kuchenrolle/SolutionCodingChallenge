import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import TextField from "@material-ui/core/TextField";
import { useRef } from "react";

export const ExpressionInput = ({ handleSubmit }) => {
  const expressionRef = useRef("");

  return (
    <Card>
      <CardContent>
        <TextField fullWidth={true} label="Expression" variant="outlined" inputRef={expressionRef}/>
      </CardContent>
      <CardActions>
        <Button
          color="primary"
          variant="contained"
          onClick={() => handleSubmit(expressionRef.current.value)}
        >
          Submit
        </Button>
      </CardActions>
    </Card>
  );
};
