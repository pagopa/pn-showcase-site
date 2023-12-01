import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import IconButton from "@mui/material/IconButton";

import { Box, Chip, Stack, Tab, Tabs, Typography } from "@mui/material";
import { INavigationBarProps } from "model";

import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';

const NavigationBar = ({
  title,
  pf,
  pa,
  faq,
  image,
  pi,
  chip
}: INavigationBarProps) => {
  const { pathname, push } = useRouter();
  const [index, setIndex] = useState<number | undefined>();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false)
  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setIsMobileMenuOpen(false);
  };

  const handleMenuItemClick = (path: string) => {
    handleCloseMenu();
    push(path);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const paths = ["/pubbliche-amministrazioni", "/cittadini", "/imprese", "/faq"];

  function a11yProps(index: number) {
    return {
      id: `page-tab-${index}`,
      'aria-controls': `page-tabpanel-${index}`,
    };
  }

  useEffect(() => {
    setIndex(paths.indexOf(pathname));
    setIsMobileMenuOpen(false);
    setSubMenuOpen(false);

    function handleResize() {
      const mobile = window.innerWidth < 900;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
      }
    }
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [pathname]);

  return (
    <Box>
      <Stack direction={{ xs: "column", sm: "row" }} >
        <Stack direction="row" alignItems="center" mx={3} my={2}>
          <Box sx={{ pr: 2, cursor: 'pointer' }} onClick={() => window.open('/', '_self')}>
            <img src={image} alt={title} aria-label={title} />
          </Box>
          <Chip label={chip} size="small" color="primary" />
          {isMobile && (
            <IconButton
              onClick={toggleMobileMenu}
              sx={{
                position: 'absolute', top: 80, right: 20, color: 'primary.main',
                '&:hover': {
                  backgroundColor: 'transparent'
                },
              }}
            >
              {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
        </Stack>
        {isMobile ? (
          <>
            <Menu
              anchorEl={anchorEl}
              open={isMobileMenuOpen}
              onClose={closeMobileMenu}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              sx={{
                '& .MuiPaper-root': {
                  width: '100%',
                  top: '152px!important',
                  boxShadow: "none",
                  left: "0px!important",
                  maxWidth: "none"
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', }}>
                <div style={{ display: "flex", justifyContent: "start", alignItems: "center" }}>
                  <Typography
                    sx={{ flexGrow: 1, color: index === 0 ? 'primary.main' : 'text.secondary', fontWeight: "600", fontSize: "1rem", paddingLeft: "16px", paddingRight: "8px" }}
                    onClick={() => handleMenuItemClick(paths[0])}
                  >
                    {pa}
                  </Typography>
                  <IconButton
                    size="small"
                    onClick={() => setSubMenuOpen(!subMenuOpen)}
                    sx={{ color: index === 0 ? 'primary.main' : 'text.secondary' }}
                  >
                    {subMenuOpen ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
                  </IconButton>
                </div>
              </Box>
              {subMenuOpen && (
                <Box sx={{ display: 'flex', flexDirection: 'column', bgcolor: 'background.paper' }}>
                  <MenuItem onClick={() => handleMenuItemClick('/documenti')} sx={{ color: pathname === '/documenti' ? 'primary.main' : 'text.secondary', fontWeight: "400", fontSize: "1rem", paddingLeft: "32px" }}>
                    Documentazione
                  </MenuItem>
                </Box>
              )}
              <MenuItem onClick={() => handleMenuItemClick(paths[1])} sx={{ color: index === 1 ? 'primary.main' : 'text.secondary' }}>
                {pf}
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick(paths[2])} sx={{ color: index === 2 ? 'primary.main' : 'text.secondary' }}>
                {pi}
              </MenuItem>
              <MenuItem onClick={() => handleMenuItemClick(paths[3])} sx={{ color: index === 3 ? 'primary.main' : 'text.secondary' }}>
                {faq}
              </MenuItem>
            </Menu>
          </>
        ) : (
          <Tabs value={index} component="nav">
            <Box sx={{ paddingTop: 6, paddingBottom: 5, display: 'flex', alignItems: 'center', cursor: 'pointer' }} >
              <Typography component="a" href={paths[0]} sx={{ flexGrow: 1, textDecoration: "none", color: index === 0 ? 'primary.main' : 'text.secondary' }} className="tab-enti">
                {pa}
              </Typography>
              <IconButton
                onClick={handleOpenMenu}
                size="small"
                sx={{ marginLeft: 1, color: index === 0 ? 'primary.main' : 'text.secondary' }}
              >
                {open ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
              </IconButton>
            </Box>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleCloseMenu}
              sx={{ marginLeft: -4, marginTop: 2 }}
            >
              <MenuItem onClick={() => handleMenuItemClick('/documenti')} sx={{ color: pathname === '/documenti' ? 'primary.main' : 'text.secondary' }}>
                Documentazione
              </MenuItem>
            </Menu>
            <Tab
              sx={{ paddingTop: 6, paddingBottom: 5, color: index === 1 ? 'primary.main' : 'text.secondary' }}
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
              sx={{ paddingTop: 6, paddingBottom: 5, color: index === 2 ? 'primary.main' : 'text.secondary' }}
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
              sx={{ paddingTop: 6, paddingBottom: 5, color: index === 3 ? 'primary.main' : 'text.secondary' }}
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
        )}
      </Stack>
    </Box>
  );
};

export default NavigationBar;
