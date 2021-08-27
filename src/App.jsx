import { useState, useCallback } from "react";
import { Layout } from "./components/Layout";
import { ExpressionInput } from "./components/ExpressionInput";
import { Results } from "./components/Results";
import Calculation from "./logic/calculation";

export const App = () => {
  const [result, setResult] = useState("");
  const [calculations, setCalculations] = useState([]);

  const calculateResult = useCallback(
    (input) => {
      let currentResult = new Calculation(input).calculate()
      setResult(currentResult)

      if (!isNaN(currentResult)) { // only record valid calculations
        let calculation = input
        .replaceAll(" ", "")
        .replaceAll("+", " + ")
        .replaceAll("-", " - ")
        .replaceAll("*", " * ")
        .replaceAll("/", " / ")

        calculation = calculation + " = " + currentResult;  
        setCalculations([calculation, ...calculations])};
    },
    [setResult, calculations] // I think setResult isn't necessary as a dependency
  );

  const resetHistory = () => {
    setCalculations([])
  }

  return (
    <Layout>
      <ExpressionInput handleSubmit={calculateResult} />
      <Results content={result} calculations={calculations} resetHistory={resetHistory} />
    </Layout>
  );
};
