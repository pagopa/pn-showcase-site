import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  Menu,
  Popover,
  Drawer,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";
import { MenuItem } from "../model";
import LangContext from "src/context/lang-context";
import { useTranslation } from "src/hook/useTranslation";
import { IMAGES_PATH } from "@utils/constants";

const styles = {
  sendMenuHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 2,
    borderBottom: "1px solid #E3E7EB",
    bgcolor: "white",
  },
  sendMenuContent: {
    padding: 2,
    bgcolor: "white",
  },
  sendMenuItem: {
    marginBottom: 2,
    border: "1px solid #E3E7EB",
    borderRadius: 4,
    padding: 2,
    textAlign: "left",
  },
  sendMenuIcon: { color: "pagoPA.main", fontSize: "32px" },
  sendMenuTitle: { fontWeight: 600, marginTop: 1 },
  sendMenuButton: {
    textTransform: "none",
    textAlign: "left",
    justifyContent: "flex-start",
    padding: 0,
  },
  sendButton: { marginLeft: 2, marginTop: 1, marginBottom: 1 },
  desktopMenu: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    mx: 3,
    borderTop: "1px solid #E3E7EB",
    "&  .MuiTabs-flexContainer": {
      alignItems: "center",
    },
  },
};

const NavigationBar: React.FC = () => {
  const { pathname, push } = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSendMenuOpen, setIsSendMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const {lang} = useContext(LangContext);
  const { t } = useTranslation(['common']);

  const menuItems: MenuItem[] = [
    { label: t('navigation.cittadini'), path: "/cittadini" },
    { label: t('navigation.aziende'), path: "/imprese" },
    {
      label: t('navigation.enti'),
      path: "/pubbliche-amministrazioni",
      subMenu: [
        {
          label: t('navigation.documentation'),
          path: "/pubbliche-amministrazioni/documenti",
        },
      ],
    },
    
    // {
    //   label: t('pickup_points.label'),
    //   path: "/punti-di-ritiro",
    //   subMenu: [
    //     { label: t('pickup_points.submenu.how'), path: "/punti-di-ritiro/come-funziona" },
    //   ],
    // },
    { label: t('navigation.send_numbers'), path: "/numeri" },
    { label: t('navigation.faq'), path: "/faq" },
  ];
  
  const toggleMenu = (menu: string, event?: React.MouseEvent<HTMLElement>) => {
    if (openSubMenu === menu) {
      setOpenSubMenu(null);
      setAnchorEl(null);
    } else {
      setOpenSubMenu(menu);
      setAnchorEl(event?.currentTarget || null);
    }
  };

  const handleMenuItemClick = (path: string) => {
    setIsMobileMenuOpen(false);
    setIsSendMenuOpen(false);
    setOpenSubMenu(null);
    push(`/${lang}${path}`);
  };

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 900);
    handleResize();
    window.addEventListener("resize", handleResize);
    setMounted(true);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!mounted) return null;

  const isPathActive = (path: string) => pathname === path;

  const renderMenuItems = (items: MenuItem[], isFirstItem: boolean = false) =>
    items.map((item, index) => {
      const isParentActive = isPathActive(item.path);
      return (
        <Box
          key={item.path}
          sx={{
            margin: "0 8px",
            position: "relative",
            ...(isFirstItem && index === 0 && { marginTop: "50px" }),
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              height: "100%",
              cursor: "pointer",
              px: isMobile ? 1 : 2, 
              backgroundColor: isParentActive && !isMobile ? "primaryAction.selected" : "transparent", 
              position: "relative",
              "&::after": {
                content: '""',
                position: "absolute",
                left: 0,
                right: 0,
                bottom: 0,
                height: 3,
                backgroundColor: isMobile ? "transparent" : "primary.main", 
                transition: "transform 0.3s ease",
                transform: isParentActive && !isMobile ? "scaleX(1)" : "scaleX(0)",
                transformOrigin: "left",
              },
            }}
            onClick={() => handleMenuItemClick(item.path)}
          >
            <Typography
              sx={{
                color: isParentActive ? "primary.main" : "text.secondary",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                height: "100%",
                position: "relative",
                transition: "background-color 0.3s ease",
                paddingBottom: 0,
                textDecoration: "none", 
              }}
            >
              {item.label}
            </Typography>
            {item.subMenu && (
              <IconButton
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleMenu(item.path, e);
                }}
                sx={{
                  transform: openSubMenu === item.path ? "rotate(180deg)" : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                  color: isParentActive ? "primary.main" : "text.secondary",
                }}
              >
                <ArrowDropDownIcon />
              </IconButton>
            )}
          </Box>
          {item.subMenu && isMobile && openSubMenu === item.path && (
            <Box sx={{ paddingLeft: 3, paddingTop: "20px" }}>
              {renderMenuItems(item.subMenu)}
            </Box>
          )}
          {item.subMenu && !isMobile && (
            <Popover
              open={openSubMenu === item.path}
              anchorEl={anchorEl}
              onClose={() => toggleMenu("")}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
            >
              <Box sx={{ padding: 2, backgroundColor: "background.paper", boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)", borderRadius: 4, zIndex: 1300 }}>
                {item.subMenu.map((subItem) => (
                  <Typography
                    key={subItem.path}
                    onClick={() => handleMenuItemClick(subItem.path)}
                    sx={{
                      cursor: "pointer",
                      color: isPathActive(subItem.path)
                        ? "primary.main"
                        : "text.secondary",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      height: "100%",
                      position: "relative",
                      ...(!isMobile && {
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          left: 0,
                          right: 0,
                          bottom: 0,
                          height: 3,
                          backgroundColor: "primary.main",
                          transition: "transform 0.3s ease",
                          transform: "scaleX(0)",
                          transformOrigin: "left",
                        },
                        "&.active::after": {
                          transform: "scaleX(1)",
                        },
                      }),
                    }}
                  >
                    {subItem.label}
                  </Typography>
                ))}
              </Box>
            </Popover>
          )}
        </Box>
      );
    });

  const sendMenuItems = [
    {
      icon: <PeopleIcon sx={styles.sendMenuIcon} />,
      title: t('login_panel.cittadini.title'),
      description: t('login_panel.cittadini.description'),
      login: t('login_panel.cittadini.login'),
      link: "https://cittadini.notifichedigitali.it/auth/login",
    },
    {
      icon: <BusinessIcon sx={styles.sendMenuIcon} />,
      title: t('login_panel.imprese.title'),
      description: t('login_panel.imprese.description'),
      login: t('login_panel.imprese.login'),
      link: "https://imprese.notifichedigitali.it/auth/login",
    },
  ];

  const thirdElementContent = (
    <Box
      sx={{
        border: "1px solid #E3E7EB",
        borderRadius: 4,
        padding: 2,
        textAlign: "left",
        bgcolor: "white",
      }}
    >
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        sx={{
          marginBottom: 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {t('login_panel.enti.title')}
        </Typography>
        <Button
          variant="text"
          color="primary"
          sx={styles.sendMenuButton}
          onClick={() =>
            (window.location.href = "https://selfcare.pagopa.it/auth/login")
          }
          endIcon={<ArrowForwardIcon />}
        >
          {t('login_panel.enti.login')}
        </Button>
      </Stack>
      <Box sx={{ borderTop: "1px solid #E3E7EB", paddingTop: 1 }}>
        <Typography variant="body2">
        {t('login_panel.enti.description')}{" "}
          <a
            href="https://docs.pagopa.it/area-riservata-enti-piattaforma-notifiche/area-riservata-enti-send-servizio-notifiche-digitali/processo-di-adesione-a-send"
            style={{ color: "pagoPA.main", textDecoration: "underline" }}
          >
            {t('login_panel.enti.link')}
          </a>
        </Typography>
      </Box>
    </Box>
  );

  const renderSendMenu = () => (
    <Box sx={{ bgcolor: "background.default" }}>
      <Box sx={styles.sendMenuHeader}>
        <Typography variant="h6" sx={{fontWeight: 600}}>
        {t('login_panel.login')}
        </Typography>
        <IconButton
          size="small"
          onClick={() => setIsSendMenuOpen(false)}
          sx={{color: "text.secondary"}}
        >
          <CloseIcon />
        </IconButton>
      </Box>
      <Box sx={styles.sendMenuContent}>
        {sendMenuItems.map((item, index) => (
          <Box key={index} sx={styles.sendMenuItem}>
            {item.icon}
            <Typography variant="subtitle1" sx={styles.sendMenuTitle}>
              {item.title}
            </Typography>
            <Typography variant="body2" sx={{ marginBottom: 1 }}>
              {item.description}
            </Typography>
            <Button
              variant="text"
              color="primary"
              sx={styles.sendMenuButton}
              onClick={() => {
                if (item.link) {
                  window.location.href = item.link;
                }
              }}
              endIcon={<ArrowForwardIcon />}
            >
              {item.login}
            </Button>
          </Box>
        ))}
      </Box>
      <Box sx={{ margin: 2 }}>{thirdElementContent}</Box>
    </Box>
  );

  const renderSendButton = () => (
    <Button
      variant="contained"
      color="primary"
      onClick={() => {
        setIsSendMenuOpen(true);
        setIsMobileMenuOpen(false);
      }}
      sx={styles.sendButton}
    >
      {t('navigation.login')}
    </Button>
  );

  const renderMobileMenu = () => (
    <Menu
      open={isMobileMenuOpen}
      onClose={() => setIsMobileMenuOpen(false)}
      anchorOrigin={{
        vertical: "bottom",
        horizontal: "left",
      }}
      transformOrigin={{
        vertical: "top",
        horizontal: "left",
      }}
      sx={{
        "& .MuiPaper-root": {
          width: "100%",
          top: "0px!important",
          boxShadow: "none",
          left: "0px!important",
          maxWidth: "none",
          height: "100vh",
        },
        "& .MuiBackdrop-root": {
          backgroundColor: "white",
        },
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
          position: "relative",
          padding: "10px",
          gap: "20px",
        }}
      >
        <IconButton
          onClick={() => setIsMobileMenuOpen(false)}
          sx={{ position: "absolute", top: 8, right: 8, color: "#5C6F82" }}
        >
          <CloseIcon />
        </IconButton>
        {isMobileMenuOpen && renderMenuItems(menuItems, true)}
      </Box>
    </Menu>
  );

  const renderDesktopMenu = () => (
    <Box sx={styles.desktopMenu}>
      <Box sx={{ display: "flex", width: "100%" }}>
        <Box sx={{ display: "flex" }}>
          {renderMenuItems(menuItems.slice(0, 3))}
        </Box>
        <Box sx={{ flex: 1 }} />
        <Box sx={{ display: "flex" }}>
          {renderMenuItems(menuItems.slice(3))}
          {renderSendButton()}
        </Box>
      </Box>
      <Drawer
        anchor="right"
        open={isSendMenuOpen}
        onClose={() => setIsSendMenuOpen(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: isMobile ? "80vw" : "25vw",
            bgcolor: "background.default",
          },
        }}
      >
        {renderSendMenu()}
      </Drawer>
    </Box>
  );

  return (
    <Box className="sendNavbar" sx={{borderBottom: "1px solid #E3E7EB"}}>
      <Stack direction="column">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mx={3}
          my={2}
        >
          <Box
            sx={{ paddingRight: 2, cursor: "pointer" }}
            onClick={() => push(`/${lang}`)}
          >
            <img src={`${IMAGES_PATH}/logo.svg`} alt={t('navigation.title')} aria-label={t('navigation.title')} />
          </Box>
          <Box>
            <Typography
              component="a"
              href="/assistenza"
              sx={{
                textDecoration: "none",
                color: "primary.main",
                display: "flex",
                alignItems: "center",
                fontSize: "14px",
                fontWeight: 600,
              }}
            >
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                {t('help')}
              </Box>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  borderRadius: "50%",
                  width: 48,
                  height: 48,
                  backgroundColor: "primary.main",
                  marginLeft: 1,
                }}
              >
                <ChatBubbleOutlineIcon
                  sx={{ color: "white", fontSize: "18px" }}
                />
              </Box>
            </Typography>
          </Box>
        </Stack>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ margin: "0px 12px" }}
        >
          {isMobile ? (
            <>
              <IconButton
                onClick={() => setIsMobileMenuOpen(true)}
                sx={{
                  color: "#5C6F82",
                  display: "flex",
                  alignItems: "center",
                  "&:hover": { backgroundColor: "transparent" },
                }}
              >
                <MenuIcon />
                <Typography
                  sx={{ marginLeft: 1, color: "#5C6F82", fontWeight: 600 }}
                >
                  Menu
                </Typography>
              </IconButton>
              {renderSendButton()}
              {renderMobileMenu()}
              <Drawer
                anchor="right"
                open={isSendMenuOpen}
                onClose={() => setIsSendMenuOpen(false)}
                sx={{ "& .MuiDrawer-paper": { width: "100vw", bgcolor: "background.default" } }}
              >
                {renderSendMenu()}
              </Drawer>
            </>
          ) : (
            renderDesktopMenu()
          )}
        </Stack>
      </Stack>
    </Box>
  );
};

export default NavigationBar;
