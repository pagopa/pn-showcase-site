import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import IconButton from "@mui/material/IconButton";

import { Box, Chip, Stack, Tab, Tabs } from "@mui/material";
import { INavigationBarProps } from "model";

const NavigationBar = ({
  title,
  chip,
  pf,
  pa,
  faq,
  image,
  pi
}: INavigationBarProps) => {
  const { pathname, push } = useRouter();
  const [index, setIndex] = useState<number | undefined>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const paths = ["/pubbliche-amministrazioni", "/cittadini", "/imprese", "/faq"];

  function a11yProps(index: number) {
    return {
      id: `page-tab-${index}`,
      'aria-controls': `page-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    let currentIndex = paths.indexOf(pathname);
    setIndex(currentIndex);
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

  // const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
  //   setIndex(newValue);
  // };


  return (
    <Box className="sendNavbar">
      <Stack direction={{ xs: "column", sm: "row" }} >
        <Stack direction="row" alignItems="center" mx={3} my={2}>
          <Box sx={{ pr: 2, cursor: 'pointer' }} onClick={() => window.open('/', '_self')}>
            <img src={image} alt={title} aria-label={title} />
          </Box>
          <Chip label={chip} size="small" color="primary" />
        </Stack>
        <Tabs value={index} component="nav">
          <Tab sx={{ paddingTop: 6, paddingBottom: 5 }}
            value={0}
            component="a"
            onClick={(
              event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
            ) => {
              if (pathname === `${paths[0]}/`) {
                event.preventDefault();
              }
            }}
            key="pubblica-amministrazione"
            label={pa}
            href={paths[0]}
            {...a11yProps(0)}
            disableRipple={true}
            icon={<IconButton
              onClick={(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
                handleOpenMenu(event);
                event.preventDefault();
              }}
              size="small"
              sx={{ marginLeft: 1 }}

            >
              {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </IconButton>}
            iconPosition="end"
          />
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleCloseMenu}
            className="entiMenuItems"
          >
            <MenuItem onClick={() => handleMenuItemClick('/documenti')}>
              Documentazione
            </MenuItem>
          </Menu>
          <Tab
            sx={{ paddingTop: 6, paddingBottom: 5 }}
            value={1}
            component="a"
            onClick={(
              event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
            ) => {
              if (pathname === `${paths[1]}/`) {
                event.preventDefault();
              }
            }}
            key="cittadini"
            label={pf}
            href={paths[1]}
            {...a11yProps(1)}
            disableRipple={true}
          />
          <Tab
            value={2}
            sx={{ paddingTop: 6, paddingBottom: 5 }}
            component="a"
            onClick={(
              event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
            ) => {
              if (pathname === `${paths[2]}/`) {
                event.preventDefault();
              }
            }}
            key="imprese"
            label={pi}
            href={paths[2]}
            {...a11yProps(2)}
            disableRipple={true}
          />
          <Tab
            value={3}
            sx={{ paddingTop: 6, paddingBottom: 5 }}
            component="a"
            onClick={(
              event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
            ) => {
              if (pathname === `${paths[3]}/`) {
                event.preventDefault();
              }
            }}
            key="faq"
            label={faq}
            href={paths[3]}
            {...a11yProps(3)}
            disableRipple={true}
          />
        </Tabs>
      </Stack>
    </Box>
  );
};

export default NavigationBar;