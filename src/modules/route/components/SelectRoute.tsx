import React, { useEffect, useState } from "react";
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import "../style/select_route.css";
import { RouteNameData } from "../types/RouteNameData";

interface SelectRouteProps {
  routeName: RouteNameData[];
  onSelectRoute: (route: RouteNameData) => void;
}

const SelectRoute: React.FC<SelectRouteProps> = ({
  routeName,
  onSelectRoute,
}) => {
  const [selectedRouteId, setSelectedRouteId] = useState<number | "">("");
  useEffect(() => {
    if (routeName.length > 0) {
      setSelectedRouteId(routeName[0].id);
      onSelectRoute(routeName[0]);
    }
  }, [routeName]);
  const handleChange = (event: SelectChangeEvent<unknown>) => {
    const selectedId = event.target.value as number | "";
    setSelectedRouteId(selectedId);

    const selectedRoute = routeName.find((route) => route.id === selectedId);
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
        className="rounded-md font-rounded"
      >
        {routeName.map((route) => (
          <MenuItem key={route.id} value={route.id} className="font-rounded">
            {route.routeName}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default SelectRoute;
