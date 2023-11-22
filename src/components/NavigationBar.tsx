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
      <Stack direction={{ xs: "column", sm: "row" }} >
        <Stack direction="row" alignItems="center" mx={3} my={2}>
          <Box sx={{ pr: 2, cursor: 'pointer' }} onClick={() => window.open('/', '_self')}>
            <img src={image} alt={title} aria-label={title} />
          </Box>
          <Chip label={chip} size="small" color="primary" />
        </Stack>
        <Tabs value={index} component="nav">
          <Box sx={{ paddingTop: 6, paddingBottom: 5, display: 'flex', alignItems: 'center', cursor: 'pointer' }} >
            <Typography component="a" href={paths[0]} sx={{ flexGrow: 1, textDecoration: "none" }} className="tab-enti">
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
            className="entiMenuItems"
          >
            <MenuItem onClick={() => handleMenuItemClick('/documenti')}>
              Documentazione
            </MenuItem>
          </Menu>
          {/* <Tab
            sx={{ paddingTop: 6, paddingBottom: 5 }}
            component="a"
            onClick={(
              event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
            ) => {
              if (pathname === `${paths[0]}/`) {
                event.preventDefault();
              }
            }}
            key="pubblica-amminstrazione"
            label={pa}
            href={paths[0]}
            {...a11yProps(0)}
            disableRipple={true}
          /> */}
          <Tab
            sx={{ paddingTop: 6, paddingBottom: 5 }}
            component="a"
            onClick={(
              event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
            ) => {
              if (pathname === `${paths[1]}/`) {
                event.preventDefault();
              }
            }}
            key="persona-fisica"
            label={pf}
            href={paths[1]}
            {...a11yProps(1)}
            disableRipple={true}
          />
          <Tab
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



// import React, { useState } from 'react';
// import { useRouter } from 'next/router';
// import { Box, Chip, Stack, Typography, IconButton, Menu, MenuItem } from '@mui/material';
// import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
// import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';

// interface NavigationBarProps {
//   title: string;
//   chip: string;
//   image: string;
//   pf: string;
//   pa: string;
//   faq: string;
//   pi: string;
// }

// const NavigationBar: React.FC<NavigationBarProps> = ({ title, chip, image, pf, pa, faq, pi }) => {
//   const router = useRouter();
//   const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

//   const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
//     setAnchorEl(event.currentTarget);
//   };

//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   const isPathActive = (path: string) => {
//     return router.pathname === path;
//   };

//   return (
//     <Box sx={{ bgcolor: 'white', color: 'primary.main' }}>
//       <Stack direction="row" alignItems="center" spacing={2}>
//         <Box sx={{ cursor: 'pointer' }} mt={2} mb={2} ml={3} onClick={() => router.push('/')}>
//           <img src={image} alt={title} aria-label={title} />
//         </Box>
//         <Chip label={chip} size="small" color="primary" onClick={() => router.push('/')} />
//         <Stack direction="row" alignItems="center">
//           <Typography
//             onClick={() => router.push('/pubbliche-amministrazioni')}
//             sx={{
//               textDecoration: isPathActive('/pubbliche-amministrazioni') ? 'underline' : 'none',
//               color: isPathActive('/pubbliche-amministrazioni') ? '#0073e6' : '#5c6f82',
//               cursor: 'pointer',
//               mr: 2,
//             }}
//           >
//             {pa}
//           </Typography>
//           <IconButton onClick={handleClick} size="small">
//             {anchorEl ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
//           </IconButton>
//           <Menu
//             anchorEl={anchorEl}
//             open={Boolean(anchorEl)}
//             onClose={handleClose}
//             className="entiMenuItems"
//           >
//             <MenuItem onClick={() => { handleClose(); router.push('/documenti'); }}>Documentazione</MenuItem>
//           </Menu>
//           <Typography
//             onClick={() => router.push('/cittadini')}
//             sx={{
//               textDecoration: isPathActive('/cittadini') ? 'underline' : 'none',
//               color: isPathActive('/cittadini') ? '#0073e6' : '#5c6f82',
//               cursor: 'pointer',
//               mr: 2,
//             }}
//           >
//             {pf}
//           </Typography>
//           <Typography
//             onClick={() => router.push('/imprese')}
//             sx={{
//               textDecoration: isPathActive('/imprese') ? 'underline' : 'none',
//               color: isPathActive('/imprese') ? '#0073e6' : '#5c6f82',
//               cursor: 'pointer',
//               mr: 2,
//             }}
//           >
//             {pi}
//           </Typography>
//           <Typography
//             onClick={() => router.push('/faq')}
//             sx={{
//               textDecoration: isPathActive('/faq') ? 'underline' : 'none',
//               color: isPathActive('/faq') ? '#0073e6' : '#5c6f82',
//               cursor: 'pointer',
//               mr: 2,
//             }}
//           >
//             {faq}
//           </Typography>
//         </Stack>
//       </Stack>
//     </Box>
//   );
// };

// export default NavigationBar;
