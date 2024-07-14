import React, { useState } from "react";
import {
  calcPercentageIncrease,
  calcUtilisation,
} from "../helper/CalculationAll";
import { SendIcon } from "../Icon/Icon";
import { Clippasteicon } from "../Icon/Icon";
let utilR = 0;
const copyToClipboard = (text) => {
  navigator.clipboard
    .writeText(text)
    .then(() => {
      console.log(`Copied to clipboard: ${text}`);
      // Optionally, you can add feedback to the user that copying was successful
    })
    .catch((error) => {
      console.error("Unable to copy:", error);
      // Optionally, you can add feedback to the user that copying failed
    });
};

const inputUtilFields = [
  { label: "Start Value :", key: "startValue" },
  { label: "Current Value :", key: "currentValue" },
];

const inputSizeField = [
  { label: "Used space :", key: "used" },
  { label: "Total Space : ", key: "totalSize" },
];

function Calculator() {
  const [valueSC, setValueSC] = useState({
    startValue: "",
    currentValue: "",
  });

  const [valueUtil, setValueUtil] = useState({
    used: "",
    totalSize: "",
  });

  const [calculations, setCalculations] = useState([]);
  const [util, setUtil] = useState(null);
  const [utilisation, setUtilisation] = useState(null);

  const handleChange = (key, value) => {
    // Allow only numeric input
    const numericValue = value.replace(/[^0-9,\.]/g, "");
    setValueSC({
      ...valueSC,
      [key]: numericValue,
    });
    setValueUtil({
      ...valueUtil,
      [key]: numericValue,
    });
  };
  
  const handleCalculateUtil = async () => {
    const { used, totalSize } = valueUtil;
    try {
      const utilResult = await calcUtilisation(used, totalSize);
      setUtil({
        used: utilResult.used,
        totalSize: utilResult.totalSize,
      });
      console.log("Utilisation calculated:", utilResult);
      utilR = utilResult;
    } catch (error) {
      console.error("Error calculating utilisation:", error);
      setUtil(null); // Reset util state if calculation fails
    }
  };

  const handleCalculateGrowth = async () => {
    const { startValue, currentValue } = valueSC;
    const utilizationResult = await calcPercentageIncrease(
      startValue,
      currentValue
    );

    const newCalculation = {
      utilisation: utilizationResult.utilisation,
      percentageIncrease: utilizationResult.pi,
      growthFactor: utilizationResult.gf,
      month1: utilizationResult.m1,
      month2: utilizationResult.m2,
      month3: utilizationResult.m3,
    };
    setCalculations([newCalculation]);
  };

  const resetInput = () => {
    inputUtilFields.forEach((field) => {
      const inputElement = document.getElementById(field.key);
      if (inputElement) {
        inputElement.value = "";
      }
    });
    setValueSC({
      startValue: "",
      currentValue: "",
    });
    setValueUtil({
      used: "",
      totalSize: "",
    });
    setUtilisation(null);
    setCalculations([]);
    setUtil(null);
  };

  const hasCalculations = calculations.length > 0;
  const hasUtilCalculation = util !== null;

  return (
    <div className="w-full h-screen flex items-center justify-center p-4">
      <div className="md:flex text-white text-xl p-6 w-full md:w-[70%] bg-slate-950 rounded-lg shadow-xl border-2 border-slate-800 overflow-hidden">
        <div className="md:w-1/2 w-full">
          <h1>Input</h1>
          <div className="flex w-3/4 text-wrap text-xs md:text-sm py-2">
            <p className="text-red-500">*</p>
            <p className="text-slate-500 ">
              Make sure you are choosing Used Space and not Free Space.
            </p>
          </div>
          <div className="flex flex-row w-auto">
            {inputSizeField.map((field, index) => (
              <div
                key={index}
                className="p-2 space-y-2 flex flex-col w-1/2 md:w-full"
              >
                <div className="flex flex-col w-full">
                  <label className="text-sm md:text-md font-bold mb-2">
                    {field.label}
                  </label>
                  <input
                    id={field.key}
                    type="text"
                    placeholder="eg: 1,234"
                    value={valueUtil[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                    className="bg-slate-500 text-white rounded-lg p-2 border border-gray-300 text-sm md:text-md"
                  />
                </div>
              </div>
            ))}
          </div>
          <div className="p-2">
            <button
              onClick={handleCalculateUtil}
              className="p-2 bg-slate-300 hover:bg-slate-200 rounded-lg transition-colors duration-300"
            >
              <SendIcon />
            </button>
          </div>
          {inputUtilFields.map((field, index) => (
            <div key={index} className="p-2 space-y-2 flex flex-col">
              <label className="text-sm md:text-md font-bold">
                {field.label}
              </label>
              <input
                id={field.key}
                type="text"
                placeholder="eg: 1,234"
                value={valueSC[field.key]}
                onChange={(e) => handleChange(field.key, e.target.value)}
                className="bg-slate-500 text-white rounded-lg p-2 border border-gray-300 w-full text-sm md:text-md"
              />
            </div>
          ))}
          <div className="p-2 flex gap-x-4 text-sm md:text-md">
            <button
              onClick={handleCalculateGrowth}
              className="bg-teal-700 p-2 rounded-lg md:w-1/2 w-full mt-10 hover:bg-teal-400 transition-colors duration-300"
            >
              Calculate
            </button>
            <button
              onClick={resetInput}
              className="bg-orange-700 p-2 rounded-lg md:w-1/2 w-full mt-10 hover:bg-orange-400 transition-colors duration-300"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="md:w-1/2 w-full mt-8 md:mt-0">
          <h1>Output</h1>
          <div className="overflow-auto p-4 text-lg md:text-sm text-center shadow-inner flex flex-col">
            <div className="flex gap-x-2 items-center">
              <div className="text-start text-xs md:text-md">
                Utilisation : {hasUtilCalculation ? utilR : "No Calculation"}
              </div>
              <button
                onClick={() => {
                  copyToClipboard(utilR);
                }}
              >
                <Clippasteicon />
              </button>
            </div>
            {hasCalculations ? (
              <table className="border border-gray-700 mt-16 text-xs">
                <thead>
                  <tr>
                    <th className="py-2 px-4 border">Percentage Increase</th>
                    <th className="py-2 px-4 border">Growth Factor</th>
                    <th className="py-2 px-4 border">Month 1</th>
                    <th className="py-2 px-4 border">Month 2</th>
                    <th className="py-2 px-4 border">Month 3</th>
                  </tr>
                </thead>
                <tbody>
                  {calculations.map((calculation, index) => (
                    <tr key={index}>
                      <td className="py-2 px-4 border">
                        {calculation.percentageIncrease}
                      </td>
                      <td className="py-2 px-4 border">
                        {calculation.growthFactor}
                      </td>
                      <td className="py-2 px-4 border">{calculation.month1}</td>
                      <td className="py-2 px-4 border">{calculation.month2}</td>
                      <td className="py-2 px-4 border">{calculation.month3}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div className="text-gray-500 mt-4 flex flex-col items-center justify-center h-full w-full">
                <div className="w-full h-full">No output available</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Calculator;
