import Tab from "@mui/material/Tab";
import Tabs from "@mui/material/Tabs";
import { useState } from "react";

type Props = {
  items: { id: number | null; label: string }[];
  value: number | null;
  valueChange: (value: number | null) => void;
};

const TabsNav = ({ value, valueChange, items }: Props): JSX.Element => {
  const [itemCur, setItemCur] = useState(value);

  function handleChange(itemId: number | null) {
    setItemCur(itemId);
    valueChange(itemId);
  }

  return (
    <Tabs component="nav" variant="fullWidth" value={itemCur}>
      {items.map((item) => (
        <Tab
          key={item.id}
          label={item.label}
          value={item.id}
          disableRipple={true}
          onClick={() => {
            handleChange(item.id);
          }}
        />
      ))}
    </Tabs>
  );
};

export default TabsNav;
