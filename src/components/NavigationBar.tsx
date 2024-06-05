import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import IconButton from "@mui/material/IconButton";
import { Box, Stack, Typography, Button, Tabs, Tab } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { INavigationBarProps } from "model";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import PeopleIcon from "@mui/icons-material/People";
import BusinessIcon from "@mui/icons-material/Business";

const NavigationBar = ({
  title,
  pf,
  pa,
  faq,
  image,
  pi,
  numeri,
  ritiro,
}: INavigationBarProps) => {
  const { pathname, push } = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSendMenuOpen, setIsSendMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [subMenuAnchorEl, setSubMenuAnchorEl] = useState<null | HTMLElement>(
    null
  );
  const openSubMenu = Boolean(subMenuAnchorEl);
  const [ritiroSubMenuAnchorEl, setRitiroSubMenuAnchorEl] =
    useState<null | HTMLElement>(null);
  const openRitiroSubMenu = Boolean(ritiroSubMenuAnchorEl);
  const [mounted, setMounted] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prevState) => !prevState);
  };

  const toggleSendMenu = () => {
    setIsSendMenuOpen((prevState) => !prevState);
  };

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setIsMobileMenuOpen(false);
    setIsSendMenuOpen(false);
  };

  const handleMenuItemClick = (path: string) => {
    handleCloseMenu();
    push(path);
  };

  const handleOpenSubMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setSubMenuAnchorEl(event.currentTarget);
  };

  const handleToggleSubMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (openSubMenu) {
      handleCloseSubMenu();
    } else {
      setSubMenuAnchorEl(event.currentTarget);
    }
  };

  const handleCloseSubMenu = () => {
    setSubMenuAnchorEl(null);
  };

  const handleOpenRitiroSubMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setRitiroSubMenuAnchorEl(event.currentTarget);
  };

  const handleToggleRitiroSubMenu = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    if (openRitiroSubMenu) {
      handleCloseRitiroSubMenu();
    } else {
      setRitiroSubMenuAnchorEl(event.currentTarget);
    }
  };

  const handleCloseRitiroSubMenu = () => {
    setRitiroSubMenuAnchorEl(null);
  };

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const closeSendMenu = () => {
    setIsSendMenuOpen(false);
  };

  const paths = [
    "/cittadini",
    "/imprese",
    "/pubbliche-amministrazioni",
    "/punti-di-ritiro",
    "/numeri",
    "/faq",
  ];

  useEffect(() => {
    setIsMobileMenuOpen(false);
    setIsSendMenuOpen(false);
    setSubMenuAnchorEl(null);
    setRitiroSubMenuAnchorEl(null);

    function handleResize() {
      const mobile = window.innerWidth < 900;
      setIsMobile(mobile);
      if (!mobile) {
        setIsMobileMenuOpen(false);
        setIsSendMenuOpen(false);
      }
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    setMounted(true);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [pathname]);

  const handleTabChange = (event: React.SyntheticEvent, newPath: string) => {
    push(newPath);
  };

  const getTabColor = (path: string) =>
    pathname === path ? "primary.main" : "text.secondary";

  if (!mounted) {
    return null; // or return a loading indicator
  }

  return (
    <Box className="sendNavbar" sx={{ borderBottom: "1px solid #E3E7EB" }}>
      <Stack direction="column">
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          mx={3}
          my={2}
        >
          <Box
            sx={{ pr: 2, cursor: "pointer" }}
            onClick={() => window.open("/", "_self")}
          >
            <img src={image} alt={title} aria-label={title} />
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
              <Box
                className="helpText"
                sx={{ display: { xs: "none", sm: "block" } }}
              >
                Serve aiuto?
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
                  style={{ color: "white", fontSize: "16px" }}
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
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  width: "100%",
                  justifyContent: "space-between",
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <IconButton
                    onClick={toggleMobileMenu}
                    sx={{
                      color: "#5C6F82",
                      display: "flex",
                      alignItems: "center",
                      "&:hover": {
                        backgroundColor: "transparent",
                      },
                    }}
                  >
                    {isMobileMenuOpen ? <CloseIcon /> : <MenuIcon />}
                    <Typography
                      sx={{
                        marginLeft: 1,
                        color: "#5C6F82",
                        fontWeight: 600,
                      }}
                    >
                      Menu
                    </Typography>
                  </IconButton>
                </Box>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={toggleSendMenu}
                  sx={{ margin: "8px 8px 8px 16px" }}
                >
                  Accedi a SEND
                </Button>
              </Box>
              <Menu
  anchorEl={anchorEl}
  open={isMobileMenuOpen}
  onClose={closeMobileMenu}
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
  }}
>
  <Box
    sx={{
      display: "flex",
      flexDirection: "column",
      bgcolor: "background.paper",
      position: "relative", // Ensure the close button can be positioned inside
      padding: "10px",
    }}
  >
    <IconButton
      onClick={closeMobileMenu}
      sx={{
        position: "absolute",
        top: 8,
        right: 8,
        color: "#5C6F82",
      }}
    >
      <CloseIcon />
    </IconButton>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        marginTop: "48px", // Add margin to push content below the close button
        marginBottom: "16px", // Ensure consistent spacing
        paddingLeft: "16px",
      }}
      onClick={() => handleMenuItemClick(paths[0])}
    >
      <Typography
        sx={{
          flexGrow: 1,
          color: getTabColor(paths[0]),
          fontSize: "1rem",
          paddingRight: "8px",
          fontWeight: 600,
        }}
      >
        {pf}
      </Typography>
    </Box>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        marginBottom: "16px", // Ensure consistent spacing
        paddingLeft: "16px",
      }}
      onClick={() => handleMenuItemClick(paths[1])}
    >
      <Typography
        sx={{
          flexGrow: 1,
          color: getTabColor(paths[1]),
          fontSize: "1rem",
          paddingRight: "8px",
          fontWeight: 600,
        }}
      >
        {pi}
      </Typography>
    </Box>
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        marginBottom: "16px", // Ensure consistent spacing
        paddingLeft: "16px",
      }}
      onClick={() => handleMenuItemClick(paths[2])}
    >
      <Typography
        sx={{
          flexGrow: 1,
          color: getTabColor(paths[2]),
          fontSize: "1rem",
          paddingRight: "8px",
          fontWeight: 600,
        }}
      >
        {pa}
      </Typography>
      <IconButton
        size="small"
        sx={{
          color: getTabColor(paths[2]),
        }}
        onClick={handleToggleSubMenu}
      >
        {openSubMenu ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </IconButton>
    </Box>
    {openSubMenu && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
          marginBottom: "16px", // Ensure consistent spacing
          paddingLeft: "32px",
        }}
      >
        <MenuItem
          onClick={() =>
            handleMenuItemClick("/pubbliche-amministrazioni/documenti")
          }
          sx={{
            color: getTabColor("/pubbliche-amministrazioni/documenti"),
            fontSize: "1rem",
          }}
        >
          Documentazione
        </MenuItem>
      </Box>
    )}
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        cursor: "pointer",
        marginBottom: "16px", // Ensure consistent spacing
        paddingLeft: "16px",
      }}
      onClick={() => handleMenuItemClick(paths[3])}
    >
      <Typography
        sx={{
          flexGrow: 1,
          color: getTabColor(paths[3]),
          fontSize: "1rem",
          paddingRight: "8px",
          fontWeight: 600,
        }}
      >
        {ritiro}
      </Typography>
      <IconButton
        size="small"
        sx={{
          color: getTabColor(paths[3]),
        }}
        onClick={handleToggleRitiroSubMenu}
      >
        {openRitiroSubMenu ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
      </IconButton>
    </Box>
    {openRitiroSubMenu && (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          bgcolor: "background.paper",
          marginBottom: "16px", // Ensure consistent spacing
          paddingLeft: "32px",
        }}
      >
        <MenuItem
          onClick={() => handleMenuItemClick("/punti-di-ritiro/come-funziona")}
          sx={{
            color: getTabColor("/punti-di-ritiro/come-funziona"),
            fontSize: "1rem",
          }}
        >
          Come funziona
        </MenuItem>
      </Box>
    )}
    <MenuItem
      onClick={() => handleMenuItemClick(paths[4])}
      sx={{
        color: getTabColor(paths[4]),
        marginBottom: "16px", // Ensure consistent spacing
        paddingLeft: "16px",
      }}
    >
      {numeri}
    </MenuItem>
    <MenuItem
      onClick={() => handleMenuItemClick(paths[5])}
      sx={{
        color: getTabColor(paths[5]),
        paddingLeft: "16px",
      }}
    >
      {faq}
    </MenuItem>
  </Box>
</Menu>


              <Menu
                anchorEl={anchorEl}
                open={isSendMenuOpen}
                onClose={closeSendMenu}
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
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                    bgcolor: "background.paper",
                    position: "relative",
                    padding: "16px",
                  }}
                >
                  <IconButton
                    onClick={closeSendMenu}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      color: "#5C6F82",
                    }}
                  >
                    <CloseIcon />
                  </IconButton>
                  <Typography variant="h6" sx={{ mb: 2 }}>
                    ACCEDI A SEND
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      bgcolor: "background.paper",
                    }}
                  >
                    <Box
                      sx={{
                        mb: 2,
                        border: "1px solid #E3E7EB",
                        borderRadius: 4,
                        padding: 2,
                        textAlign: "left",
                      }}
                    >
                      <PeopleIcon sx={{ color: "#0066CC", fontSize: "32px" }} />
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, marginTop: 1 }}
                      >
                        Cittadini
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Accedi come persona fisica, libero professionista o
                        ditta individuale
                      </Typography>
                      <Button
                        variant="text"
                        color="primary"
                        sx={{
                          textTransform: "none",
                          textAlign: "left",
                          justifyContent: "flex-start",
                          padding: 0,
                        }}
                        onClick={() =>
                          (window.location.href =
                            "https://cittadini.notifichedigitali.it/auth/login")
                        }
                        endIcon={<ArrowForwardIcon />}
                      >
                        Accedi
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        mb: 2,
                        border: "1px solid #E3E7EB",
                        borderRadius: 4,
                        padding: 2,
                        textAlign: "left",
                      }}
                    >
                      <BusinessIcon
                        sx={{ color: "#0066CC", fontSize: "32px" }}
                      />
                      <Typography
                        variant="subtitle1"
                        sx={{ fontWeight: 600, marginTop: 1 }}
                      >
                        Imprese
                      </Typography>
                      <Typography variant="body2" sx={{ mb: 1 }}>
                        Accedi come persona giuridica
                      </Typography>
                      <Button
                        variant="text"
                        color="primary"
                        sx={{
                          textTransform: "none",
                          textAlign: "left",
                          justifyContent: "flex-start",
                          padding: 0,
                        }}
                        onClick={() =>
                          (window.location.href =
                            "https://imprese.notifichedigitali.it/auth/login")
                        }
                        endIcon={<ArrowForwardIcon />}
                      >
                        Accedi
                      </Button>
                    </Box>
                    <Box
                      sx={{
                        border: "1px solid #E3E7EB",
                        borderRadius: 4,
                        padding: 2,
                        textAlign: "left",
                      }}
                    >
                      <Stack
                        direction="row"
                        alignItems="center"
                        justifyContent="space-between"
                        sx={{ mb: 1 }}
                      >
                        <Typography
                          variant="subtitle1"
                          sx={{ fontWeight: 600 }}
                        >
                          Sei un ente?
                        </Typography>
                        <Button
                          variant="text"
                          color="primary"
                          sx={{
                            textTransform: "none",
                            textAlign: "left",
                            justifyContent: "flex-start",
                            padding: 0,
                          }}
                          onClick={() =>
                            (window.location.href =
                              "https://selfcare.pagopa.it/auth/login")
                          }
                          endIcon={<ArrowForwardIcon />}
                        >
                          Accedi
                        </Button>
                      </Stack>
                      <Box
                        sx={{
                          borderTop: "1px solid #E3E7EB",
                          paddingTop: 1,
                        }}
                      >
                        <Typography variant="body2">
                          Il tuo ente non ha ancora aderito?{" "}
                          <a
                            href="https://selfcare.pagopa.it/auth/login?onSuccess=%2Fonboarding%2Fprod-pn"
                            style={{
                              color: "#0066CC",
                              textDecoration: "underline",
                            }}
                          >
                            Scopri come aderire
                          </a>
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Menu>
            </>
          ) : (
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                margin: "0px 24px",
                borderTop: "1px solid #E3E7EB",
              }}
            >
              <Tabs
                value={pathname}
                onChange={handleTabChange}
                aria-label="navigation tabs"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Tab
                  label={pf}
                  value={paths[0]}
                  sx={{
                    textTransform: "none",
                    minWidth: 0,
                    color: getTabColor(paths[0]),
                  }}
                />
                <Tab
                  label={pi}
                  value={paths[1]}
                  sx={{
                    textTransform: "none",
                    minWidth: 0,
                    color: getTabColor(paths[1]),
                  }}
                />
                <Tab
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {pa}
                      <IconButton
                        size="small"
                        sx={{
                          marginLeft: 1,
                          color: getTabColor(paths[2]),
                        }}
                        onClick={handleOpenSubMenu}
                      >
                        {openSubMenu ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )}
                      </IconButton>
                    </Box>
                  }
                  value={paths[2]}
                  sx={{
                    textTransform: "none",
                    minWidth: 0,
                    color: getTabColor(paths[2]),
                  }}
                />
              </Tabs>

              <Menu
                anchorEl={subMenuAnchorEl}
                open={openSubMenu}
                onClose={handleCloseSubMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                sx={{ marginLeft: 3 }}
              >
                <MenuItem
                  onClick={() =>
                    handleMenuItemClick("/pubbliche-amministrazioni/documenti")
                  }
                  sx={{
                    color: getTabColor("/pubbliche-amministrazioni/documenti"),
                  }}
                >
                  Documentazione
                </MenuItem>
              </Menu>
              <Menu
                anchorEl={ritiroSubMenuAnchorEl}
                open={openRitiroSubMenu}
                onClose={handleCloseRitiroSubMenu}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                transformOrigin={{
                  vertical: "top",
                  horizontal: "center",
                }}
                sx={{ marginLeft: 3 }}
              >
                <MenuItem
                  onClick={() =>
                    handleMenuItemClick("/punti-di-ritiro/come-funziona")
                  }
                  sx={{
                    color: getTabColor("/punti-di-ritiro/come-funziona"),
                  }}
                >
                  Come funziona
                </MenuItem>
              </Menu>
              <Tabs
                value={pathname}
                onChange={handleTabChange}
                aria-label="navigation tabs"
                sx={{ display: "flex", alignItems: "center" }}
              >
                <Tab
                  label={
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      {ritiro}
                      <IconButton
                        size="small"
                        sx={{
                          marginLeft: 1,
                          color: getTabColor(paths[3]),
                        }}
                        onClick={handleOpenRitiroSubMenu}
                      >
                        {openRitiroSubMenu ? (
                          <ArrowDropUpIcon />
                        ) : (
                          <ArrowDropDownIcon />
                        )}
                      </IconButton>
                    </Box>
                  }
                  value={paths[3]}
                  sx={{
                    textTransform: "none",
                    minWidth: 0,
                    color: getTabColor(paths[3]),
                  }}
                />
                <Tab
                  label={numeri}
                  value={paths[4]}
                  sx={{
                    textTransform: "none",
                    minWidth: 0,
                    color: getTabColor(paths[4]),
                  }}
                />
                <Tab
                  label={faq}
                  value={paths[5]}
                  sx={{
                    textTransform: "none",
                    minWidth: 0,
                    color: getTabColor(paths[5]),
                  }}
                />
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    paddingLeft: 2,
                  }}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={toggleSendMenu}
                  >
                    Accedi a SEND
                  </Button>
                </Box>
              </Tabs>
            </Box>
          )}
        </Stack>
      </Stack>
      <Menu
        anchorEl={anchorEl}
        open={isSendMenuOpen}
        onClose={closeSendMenu}
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
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            bgcolor: "background.paper",
            position: "relative",
            padding: "16px",
          }}
        >
          <IconButton
            onClick={closeSendMenu}
            sx={{
              position: "absolute",
              top: 8,
              right: 8,
              color: "#5C6F82",
            }}
          >
            <CloseIcon />
          </IconButton>
          <Typography variant="h6" sx={{ mb: 2 }}>
            ACCEDI A SEND
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              bgcolor: "background.paper",
            }}
          >
            <Box
              sx={{
                mb: 2,
                border: "1px solid #E3E7EB",
                borderRadius: 4,
                padding: 2,
                textAlign: "left",
              }}
            >
              <PeopleIcon sx={{ color: "#0066CC", fontSize: "32px" }} />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, marginTop: 1 }}
              >
                Cittadini
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Accedi come persona fisica, libero professionista o ditta
                individuale
              </Typography>
              <Button
                variant="text"
                color="primary"
                sx={{
                  textTransform: "none",
                  textAlign: "left",
                  justifyContent: "flex-start",
                  padding: 0,
                }}
                onClick={() =>
                  (window.location.href =
                    "https://cittadini.notifichedigitali.it/auth/login")
                }
                endIcon={<ArrowForwardIcon />}
              >
                Accedi
              </Button>
            </Box>
            <Box
              sx={{
                mb: 2,
                border: "1px solid #E3E7EB",
                borderRadius: 4,
                padding: 2,
                textAlign: "left",
              }}
            >
              <BusinessIcon sx={{ color: "#0066CC", fontSize: "32px" }} />
              <Typography
                variant="subtitle1"
                sx={{ fontWeight: 600, marginTop: 1 }}
              >
                Imprese
              </Typography>
              <Typography variant="body2" sx={{ mb: 1 }}>
                Accedi come persona giuridica
              </Typography>
              <Button
                variant="text"
                color="primary"
                sx={{
                  textTransform: "none",
                  textAlign: "left",
                  justifyContent: "flex-start",
                  padding: 0,
                }}
                onClick={() =>
                  (window.location.href =
                    "https://imprese.notifichedigitali.it/auth/login")
                }
                endIcon={<ArrowForwardIcon />}
              >
                Accedi
              </Button>
            </Box>
            <Box
              sx={{
                border: "1px solid #E3E7EB",
                borderRadius: 4,
                padding: 2,
                textAlign: "left",
              }}
            >
              <Stack
                direction="row"
                alignItems="center"
                justifyContent="space-between"
                sx={{ mb: 1 }}
              >
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  Sei un ente?
                </Typography>
                <Button
                  variant="text"
                  color="primary"
                  sx={{
                    textTransform: "none",
                    textAlign: "left",
                    justifyContent: "flex-start",
                    padding: 0,
                  }}
                  onClick={() =>
                    (window.location.href =
                      "https://selfcare.pagopa.it/auth/login")
                  }
                  endIcon={<ArrowForwardIcon />}
                >
                  Accedi
                </Button>
              </Stack>
              <Box
                sx={{
                  borderTop: "1px solid #E3E7EB",
                  paddingTop: 1,
                }}
              >
                <Typography variant="body2">
                  Il tuo ente non ha ancora aderito?{" "}
                  <a
                    href="https://selfcare.pagopa.it/auth/login?onSuccess=%2Fonboarding%2Fprod-pn"
                    style={{
                      color: "#0066CC",
                      textDecoration: "underline",
                    }}
                  >
                    Scopri come aderire
                  </a>
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Menu>
    </Box>
  );
};

export default NavigationBar;
