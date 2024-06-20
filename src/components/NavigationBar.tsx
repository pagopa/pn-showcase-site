import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Stack,
  Typography,
  Button,
  IconButton,
  Menu,
  Tabs,
  Popover,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";

interface INavigationBarProps {
  title: string;
  image: string;
}

interface MenuItem {
  label: string;
  path: string;
  subMenu?: MenuItem[];
}

const styles = {
  menuItemBox: { margin: "0 16px" },
  menuItemText: { cursor: "pointer", color: "text.secondary", fontWeight: 600 },
  menuItemIcon: { color: "text.secondary" },
  subMenuBox: { paddingLeft: 3 },
  subMenuBoxMobile: { paddingLeft: 3, paddingTop: "20px" },
  sendMenuBox: {
    display: "flex",
    flexDirection: "column",
    bgcolor: "background.paper",
    height: "100%",
    width: "100%",
  },
  sendMenuHeader: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "16px",
    borderBottom: "1px solid #E3E7EB",
  },
  sendMenuHeaderText: { fontWeight: 600 },
  sendMenuCloseButton: { color: "text.secondary" },
  sendMenuContent: { padding: "16px" },
  sendMenuItem: {
    marginBottom: 2,
    border: "1px solid #E3E7EB",
    borderRadius: 4,
    padding: 2,
    textAlign: "left",
  },
  sendMenuIcon: { color: "#0066CC", fontSize: "32px" },
  sendMenuTitle: { fontWeight: 600, marginTop: 1 },
  sendMenuButton: {
    textTransform: "none",
    textAlign: "left",
    justifyContent: "flex-start",
    padding: 0,
  },
  sendMenuCustom: {
    border: "1px solid #E3E7EB",
    borderRadius: 4,
    padding: 2,
    textAlign: "left",
  },
  sendMenuCustomHeader: {
    marginBottom: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  sendMenuCustomTitle: { fontWeight: 600 },
  sendMenuCustomLink: {
    color: "#0066CC",
    textDecoration: "underline",
  },
  navbar: { borderBottom: "1px solid #E3E7EB" },
  mobileMenuBox: {
    display: "flex",
    alignItems: "center",
    width: "100%",
    justifyContent: "space-between",
    borderTop: "1px solid #E3E7EB",
  },
  menuIconButton: {
    color: "#5C6F82",
    display: "flex",
    alignItems: "center",
    "&:hover": {
      backgroundColor: "transparent",
    },
  },
  menuIconText: { marginLeft: 1, color: "#5C6F82", fontWeight: 600 },
  sendButton: { marginLeft: 2 },
  desktopMenu: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    margin: "0px 24px",
    borderTop: "1px solid #E3E7EB",
  },
  assistenzaLink: {
    textDecoration: "none",
    color: "primary.main",
    display: "flex",
    alignItems: "center",
    fontSize: "14px",
    fontWeight: 600,
  },
  assistenzaIconContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: "50%",
    width: 48,
    height: 48,
    backgroundColor: "primary.main",
    marginLeft: 1,
  },
  assistenzaIcon: {
    color: "white",
    fontSize: "16px",
  },
  mobileMenuContainer: {
    display: "flex",
    flexDirection: "column",
    bgcolor: "background.paper",
    position: "relative",
    padding: "10px",
    gap: "20px",
  },
  mobileMenuCloseButton: {
    position: "absolute",
    top: 8,
    right: 8,
    color: "#5C6F82",
  },
  menuPaper: {
    width: "100%",
    top: "0px!important",
    boxShadow: "none",
    left: "0px!important",
    maxWidth: "none",
    height: "100vh",
  },
  desktopMenuPaper: {
    width: "25vw",
    height: "100vh",
    boxShadow: "none",
    position: "fixed",
    right: 0,
    top: 0,
  },
  popupSubMenuBox: {
    padding: 2,
    backgroundColor: "background.paper",
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    borderRadius: 4,
    zIndex: 1300,
  },
  firstMenuItem: { marginTop: "50px" },
};

const NavigationBar: React.FC<INavigationBarProps> = ({ title, image }) => {
  const { pathname, push } = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isSendMenuOpen, setIsSendMenuOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [openSubMenu, setOpenSubMenu] = useState<string | null>(null);
  const [mounted, setMounted] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

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
    push(path);
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

  const menuItems: MenuItem[] = [
    { label: "Cittadini", path: "/cittadini" },
    { label: "Imprese", path: "/imprese" },
    {
      label: "Enti",
      path: "/pubbliche-amministrazioni",
      subMenu: [
        {
          label: "Documentazione",
          path: "/pubbliche-amministrazioni/documenti",
        },
      ],
    },
    {
      label: "Punti di ritiro",
      path: "/punti-di-ritiro",
      subMenu: [
        { label: "Come funziona", path: "/punti-di-ritiro/come-funziona" },
      ],
    },
    { label: "Send in numeri", path: "/numeri" },
    { label: "FAQ", path: "/faq" },
  ];

  const renderMenuItems = (
    items: MenuItem[],
    parentPath: string = "",
    isFirstItem: boolean = false
  ) =>
    items.map((item, index) => {
      const isParentActive = isPathActive(item.path);
      return (
        <Box
          key={item.path}
          sx={{
            ...styles.menuItemBox,
            ...(isFirstItem && index === 0 && styles.firstMenuItem),
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography
              onClick={() => handleMenuItemClick(item.path)}
              sx={{
                ...styles.menuItemText,
                color: isParentActive ? "primary.main" : "text.secondary",
              }}
            >
              {item.label}
            </Typography>
            {item.subMenu && (
              <IconButton
                size="small"
                onClick={(e) => toggleMenu(item.path, e)}
                sx={{
                  ...styles.menuItemIcon,
                  transform:
                    openSubMenu === item.path
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                  transition: "transform 0.3s ease",
                  color: isParentActive ? "primary.main" : "text.secondary",
                }}
              >
                <ArrowDropDownIcon />
              </IconButton>
            )}
          </Box>
          {item.subMenu && isMobile && openSubMenu === item.path && (
            <Box sx={styles.subMenuBoxMobile}>
              {renderMenuItems(item.subMenu, item.path)}
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
              <Box sx={styles.popupSubMenuBox}>
                {renderMenuItems(item.subMenu, item.path)}
              </Box>
            </Popover>
          )}
        </Box>
      );
    });

  const renderSendMenu = () => {
    const sendMenuItems = [
      {
        icon: <PeopleIcon sx={styles.sendMenuIcon} />,
        title: "Cittadini",
        description:
          "Accedi come persona fisica, libero professionista o ditta individuale",
        link: "https://cittadini.notifichedigitali.it/auth/login",
      },
      {
        icon: <BusinessIcon sx={styles.sendMenuIcon} />,
        title: "Imprese",
        description: "Accedi come persona giuridica",
        link: "https://imprese.notifichedigitali.it/auth/login",
      },
      {
        custom: true,
        content: (
          <Box sx={styles.sendMenuCustom}>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              sx={styles.sendMenuCustomHeader}
            >
              <Typography variant="subtitle1" sx={styles.sendMenuCustomTitle}>
                Sei un ente?
              </Typography>
              <Button
                variant="text"
                color="primary"
                sx={styles.sendMenuButton}
                onClick={() =>
                  (window.location.href =
                    "https://selfcare.pagopa.it/auth/login")
                }
                endIcon={<ArrowForwardIcon />}
              >
                Accedi
              </Button>
            </Stack>
            <Box sx={{ borderTop: "1px solid #E3E7EB", paddingTop: 1 }}>
              <Typography variant="body2">
                Il tuo ente non ha ancora aderito?{" "}
                <a
                  href="https://selfcare.pagopa.it/auth/login?onSuccess=%2Fonboarding%2Fprod-pn"
                  style={styles.sendMenuCustomLink}
                >
                  Scopri come aderire
                </a>
              </Typography>
            </Box>
          </Box>
        ),
      },
    ];

    return (
      <Box sx={styles.sendMenuBox}>
        <Box sx={styles.sendMenuHeader}>
          <Typography variant="h6" sx={styles.sendMenuHeaderText}>
            Accedi a SEND
          </Typography>
          {!isMobile && (
            <IconButton
              size="small"
              onClick={() => setIsSendMenuOpen(false)}
              sx={styles.sendMenuCloseButton}
            >
              <CloseIcon />
            </IconButton>
          )}
        </Box>
        <Box sx={styles.sendMenuContent}>
          {sendMenuItems.map((item, index) =>
            item.custom ? (
              item.content
            ) : (
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
                  Accedi
                </Button>
              </Box>
            )
          )}
        </Box>
      </Box>
    );
  };

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
      Accedi a SEND
    </Button>
  );

  const renderMobileMenu = () => (
    <>
      <Box sx={styles.mobileMenuBox}>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <IconButton
            onClick={() => {
              setIsMobileMenuOpen((prev) => !prev);
              setIsSendMenuOpen(false);
            }}
            sx={styles.menuIconButton}
          >
            {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
            <Typography sx={styles.menuIconText}>Menu</Typography>
          </IconButton>
        </Box>
        {renderSendButton()}
      </Box>
      <Menu
        open={isMobileMenuOpen || isSendMenuOpen}
        onClose={() => {
          setIsMobileMenuOpen(false);
          setIsSendMenuOpen(false);
          setOpenSubMenu(null);
        }}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{
          "& .MuiPaper-root": styles.menuPaper,
          "& .MuiBackdrop-root": {
            backgroundColor: "white",
          },
        }}
      >
        <Box sx={styles.mobileMenuContainer}>
          <IconButton
            onClick={() => {
              setIsMobileMenuOpen(false);
              setIsSendMenuOpen(false);
              setOpenSubMenu(null);
            }}
            sx={styles.mobileMenuCloseButton}
          >
            <CloseIcon />
          </IconButton>
          {isMobileMenuOpen && renderMenuItems(menuItems, "", true)}
          {isSendMenuOpen && renderSendMenu()}
        </Box>
      </Menu>
    </>
  );

  const renderDesktopMenu = () => (
    <Box sx={styles.desktopMenu}>
      <Tabs
        value={pathname}
        onChange={(event, newPath) => handleMenuItemClick(newPath)}
        aria-label="navigation tabs"
        sx={{ display: "flex", alignItems: "center" }}
      >
        {renderMenuItems(menuItems.slice(0, 3))}
      </Tabs>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        {renderMenuItems(menuItems.slice(3))}
        {renderSendButton()}
      </Box>
      <Menu
        open={isSendMenuOpen}
        onClose={() => setIsSendMenuOpen(false)}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        sx={{
          "& .MuiPaper-root": styles.desktopMenuPaper,
          "& .MuiBackdrop-root": {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        {renderSendMenu()}
      </Menu>
    </Box>
  );

  return (
    <Box className="sendNavbar" sx={styles.navbar}>
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
            onClick={() => window.open("/", "_self")}
          >
            <img src={image} alt={title} aria-label={title} />
          </Box>
          <Box>
            <Typography
              component="a"
              href="/assistenza"
              sx={styles.assistenzaLink}
            >
              <Box sx={{ display: { xs: "none", sm: "block" } }}>
                Serve aiuto?
              </Box>
              <Box sx={styles.assistenzaIconContainer}>
                <ChatBubbleOutlineIcon sx={styles.assistenzaIcon} />
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
          {isMobile ? renderMobileMenu() : renderDesktopMenu()}
        </Stack>
      </Stack>
    </Box>
  );
};

export default NavigationBar;
