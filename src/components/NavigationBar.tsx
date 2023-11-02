import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import IconButton from "@mui/material/IconButton";

import { Box, Chip, Stack, Tab, Tabs, Typography } from "@mui/material";
import { INavigationBarProps } from "model";

const NavigationBar = ({
  title,
  chip,
  pf,
  pa,
  faq,
  image,
}: INavigationBarProps) => {
  const { pathname, push } = useRouter();
  const [index, setIndex] = useState<number | undefined>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const paths = ["/pubbliche-amministrazioni", "/cittadini", "/faq"];

  function a11yProps(index: number) {
    return {
      id: `page-tab-${index}`,
      'aria-controls': `page-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    setIndex(paths.indexOf(pathname));
  }, [pathname]);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleMenuItemClick = (path: string) => {
    handleCloseMenu();
    push(path);
  };
  

  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }}>
        <Stack direction="row" alignItems="center" mx={3} my={2}>
          <Box sx={{ pr: 2 }}>
            <img src={image} alt={title} aria-label={title} />
          </Box>
          <Chip label={chip} size="small" color="primary" />
        </Stack>
        <Tabs value={index} component="nav">
          <Box sx={{ paddingTop: 6, paddingBottom: 5, display: 'flex', alignItems: 'center', cursor: 'pointer' }}>
            <Typography component="a" href={paths[0]} sx={{ flexGrow: 1, textDecoration: "none" }}>
              {pa}
            </Typography>
            <IconButton
              onClick={handleOpenMenu}
              size="small"
              sx={{ marginLeft: 1 }}
            >
              {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </IconButton>
          </Box>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
          >
            <MenuItem onClick={() => handleMenuItemClick('/documenti')}>
              Come aderire a SEND
            </MenuItem>
          </Menu>
          <Tab
            sx={{ paddingTop: 6, paddingBottom: 5 }}
            component="a"
            onClick={() => push(paths[1])}
            key="persona-fisica"
            label={pf}
            href={paths[1]}
            {...a11yProps(1)}
            disableRipple={true}
          />
          <Tab
            sx={{ paddingTop: 6, paddingBottom: 5 }}
            component="a"
            onClick={() => push(paths[2])}
            key="faq"
            label={faq}
            href={paths[2]}
            {...a11yProps(2)}
            disableRipple={true}
          />
        </Tabs>
      </Stack>
    </Box>
  );
};

export default NavigationBar;



