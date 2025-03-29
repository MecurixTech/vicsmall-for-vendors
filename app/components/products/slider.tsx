"use client"

import Box from "@mui/material/Box"
import Slider from "@mui/material/Slider"

function valuetext(value: number) {
  return `$${value}`
}

const RangeSlider = ({
  priceRange,
  setPriceRange,
  min = 0,
  max = 10000,
}: {
  priceRange: number[]
  setPriceRange: (newRange: number[]) => void
  min?: number
  max?: number
}) => {
  const handleChange = (_event: Event, newValue: number | number[]) => {
    setPriceRange(newValue as number[])
  }

  return (
    <Box>
      <Slider
        sx={{ color: "#FF8C48", py: 0 }}
        size="small"
        getAriaLabel={() => "Price range"}
        value={priceRange}
        onChange={handleChange}
        getAriaValueText={valuetext}
        min={min}
        max={max}
        valueLabelDisplay="auto"
        valueLabelFormat={(value) => `$${value}`}
      />
    </Box>
  )
}

export default RangeSlider

