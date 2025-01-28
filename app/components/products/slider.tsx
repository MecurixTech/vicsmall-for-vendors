import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Dispatch, SetStateAction } from "react";

function valuetext(value: number) {
  return `$${value}`;
}

const RangeSlider = ({
  priceRange,
  setPriceRange,
}: {
  priceRange: number[];
  setPriceRange: Dispatch<SetStateAction<number[]>>;
}) => {
  const handleChange = (event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[]);
  };

  return (
    <Box>
      <Slider
        sx={{ color: "#FF8C48", py: 0 }}
        size="small"
        getAriaLabel={() => "Temperature range"}
        value={priceRange}
        onChange={handleChange}
        getAriaValueText={valuetext}
      />
    </Box>
  );
};

export default RangeSlider;
