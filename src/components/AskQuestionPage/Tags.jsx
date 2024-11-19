import React, { useState } from "react";
import { Chip } from "@mui/material";
import TagFacesIcon from "@mui/icons-material/TagFaces";

export default function ChipsArray() {
  const [chipData, setChipData] = useState([
    { key: 0, label: "Angular" },
    { key: 1, label: "jQuery" },
    { key: 2, label: "Polymer" },
    { key: 3, label: "React" },
    { key: 4, label: "Vue.js" },
  ]);

  const handleDelete = (chipToDelete) => () => {
    setChipData((chips) =>
      chips.filter((chip) => chip.key !== chipToDelete.key)
    );
  };

  return (
    <Paper component="ul" className="flex justify-center flex-wrap list-none p-2 m-0">
      {chipData.map((data) => {
        let icon;
        if (data.label === "React") {
          icon = <TagFacesIcon />;
        }

        return (
          <li key={data.key}>
            <Chip
              icon={icon}
              label={data.label}
              onDelete={data.label === "React" ? undefined : handleDelete(data)}
              className="m-2"
            />
          </li>
        );
      })}
    </Paper>
  );
}
