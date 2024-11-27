"use client";
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { useState } from "react";
import "../style/select_route.css";
import { RouteNameData } from "../types/RouteNameData";

interface SelectRouteProps {
  routesName: RouteNameData[];
  onSelectRoute: (routesName: RouteNameData) => void;
}
export default function SelectRoute({
  routesName,
  onSelectRoute,
}: SelectRouteProps) {
  const [selectedRouteId, setSelectedRouteId] = useState<number | "">("");

  const handleChange = (event: SelectChangeEvent<number>) => {
    const selectedId = event.target.value as number;
    setSelectedRouteId(selectedId);
    const selectedRoute = routesName.find((route) => route.id === selectedId);
    if (selectedRoute) {
      onSelectRoute(selectedRoute);
    }
  };

  return (
    <FormControl sx={{ width: 300 }} size="small" className="m-0">
      <Select
        value={selectedRouteId}
        onChange={handleChange}
        displayEmpty
        className="rounded-md"
      >
        <MenuItem value="">
          <em className="font-rounded">Chọn tuyến</em>
        </MenuItem>
        {routesName.map((route) => (
          <MenuItem key={route.id} value={route.id} className="font-rounded">
            {route.routeName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}
