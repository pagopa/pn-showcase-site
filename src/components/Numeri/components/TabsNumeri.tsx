import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import {
  Box,
  Breakpoint,
  Button,
  ButtonGroup,
  ClickAwayListener,
  Grow,
  MenuItem,
  MenuList,
  Paper,
  Popper,
} from "@mui/material";
import { dashboardColors } from "../shared/colors";
import CardText from "./CardText";
import { useTabBehavior } from "src/hook/useTabBehavior";
import { useTranslation } from "src/hook/useTranslation";

type Props = {
  tabs: Array<string>;
  fullWidth?: boolean;
  buttonSize?: "small" | "medium" | "large";
  breakOnMobile?: boolean;
  onTabChange: (v: number) => void;
  initialTab?: number;
  breakpoint?: Breakpoint;
  showDescription?: boolean;
};

const TabsNumeri = ({
  tabs,
  fullWidth = false,
  buttonSize = "small",
  breakOnMobile = true,
  onTabChange,
  initialTab = 3,
  breakpoint = "xs",
  showDescription = true,
}: Props) => {
  const {
    currentTab,
    dropdownOpen,
    anchorRef,
    isMobile,
    handleChangeTab,
    handleToggleDropdown,
    handleCloseDropdown,
  } = useTabBehavior(initialTab, breakpoint, onTabChange);
  const { t } = useTranslation(["numeri"]);

  return (
    <Box
      sx={{
        textAlign: "left",
        width: fullWidth ? "100%" : "auto",
        position: "relative",
      }}
    >
      {/* This element is invisible but is read by screen readers. It notifies the user that the data has been updated when the button is clicked */}
      <Box
        component="span"
        sx={{
          position: "absolute",
          width: "1px",
          height: "1px",
          padding: 0,
          overflow: "hidden",
          clip: "rect(0, 0, 0, 0)",
          whiteSpace: "nowrap",
          border: 0,
        }}
        aria-live="assertive"
        aria-atomic="true"
      >
        {`${t("sent_notifications.screen_readers")} ${tabs[currentTab]}.`}
      </Box>
      {(!isMobile || !breakOnMobile) && (
        <>
          {showDescription && (
            <CardText sx={{ mb: 1.5 }}>
              {t("sent_notifications.filters")}
            </CardText>
          )}
          <ButtonGroup
            color="primary"
            fullWidth={fullWidth}
            role="tablist"
            sx={{
              "& .MuiButtonGroup-grouped": {
                borderColor: dashboardColors.get("blue-io"),
              },
              "& .MuiButtonGroup-grouped:not(:last-of-type)": {
                borderRightColor: dashboardColors.get("blue-io"),
              },
            }}
          >
            {tabs.map((tab, index) => {
              const selected = currentTab === index;
              return (
                <Button
                  sx={{
                    borderColor: dashboardColors.get("blue-io"),
                    borderWidth: 1,
                    fontWeight: 700,
                    color: selected
                      ? "#fff"
                      : dashboardColors.get("blue-io"),
                    backgroundColor: selected
                      ? dashboardColors.get("blue-io")
                      : "#fff",
                    "&:hover": {
                      borderColor: dashboardColors.get("blue-io"),
                      color: selected
                        ? "#fff"
                        : dashboardColors.get("blue-io"),
                      backgroundColor: selected
                        ? dashboardColors.get("blue-io-600")
                        : dashboardColors.get("blue-io-50"),
                    },
                  }}
                  onClick={() => handleChangeTab(index)}
                  size={buttonSize}
                  value={index}
                  key={tab}
                  role="tab"
                  aria-selected={selected}
                >
                  {tab}
                </Button>
              );
            })}
          </ButtonGroup>
        </>
      )}
      {isMobile && breakOnMobile && (
        <>
          <ButtonGroup
            ref={anchorRef}
            sx={{
              "& .MuiButtonGroup-grouped": {
                borderColor: dashboardColors.get("blue-io"),
              },
              "& .MuiButtonGroup-grouped:not(:last-of-type)": {
                borderRightColor: dashboardColors.get("blue-io"),
              },
            }}
          >
            <Button
              onClick={handleToggleDropdown}
              size={buttonSize}
              sx={{
                borderColor: dashboardColors.get("blue-io"),
                color: dashboardColors.get("blue-io"),
                fontWeight: 700,
                borderWidth: 1,

                "&:hover": {
                  color: dashboardColors.get("blue-io"),
                  borderColor: dashboardColors.get("blue-io"),
                },
              }}
            >
              {tabs[currentTab]}
            </Button>
            <Button
              size={buttonSize}
              sx={{
                borderColor: dashboardColors.get("blue-io"),
                color: dashboardColors.get("blue-io"),
                fontWeight: 700,
                "&:hover": {
                  color: dashboardColors.get("blue-io"),
                  borderColor: dashboardColors.get("blue-io"),
                },
              }}
              aria-controls={dropdownOpen ? "split-button-menu" : undefined}
              aria-expanded={dropdownOpen ? "true" : undefined}
              aria-haspopup="menu"
              onClick={handleToggleDropdown}
            >
              <ArrowDropDownIcon />
            </Button>
          </ButtonGroup>
          <Popper
            open={dropdownOpen}
            anchorEl={anchorRef.current}
            transition
            sx={{ zIndex: 4 }}
            disablePortal
          >
            {({ TransitionProps, placement }) => (
              <Grow
                {...TransitionProps}
                style={{
                  transformOrigin:
                    placement === "bottom" ? "center top" : "center bottom",
                }}
              >
                <Paper>
                  <ClickAwayListener onClickAway={handleCloseDropdown}>
                    <MenuList id="split-button-menu" autoFocusItem>
                      {tabs.map((tab, index) => (
                        <MenuItem
                          sx={{
                            color: dashboardColors.get("blue-io"),
                            fontWeight: index === currentTab ? 700 : 400,
                            "&.Mui-selected": {
                              color: dashboardColors.get("blue-io"),
                              fontWeight: 700,
                              backgroundColor:
                                dashboardColors.get("blue-io-50"),
                            },
                            "&.Mui-selected:hover": {
                              backgroundColor:
                                dashboardColors.get("blue-io-100"),
                            },
                          }}
                          key={tab}
                          selected={index === currentTab}
                          onClick={() => handleChangeTab(index)}
                        >
                          {tab}
                        </MenuItem>
                      ))}
                    </MenuList>
                  </ClickAwayListener>
                </Paper>
              </Grow>
            )}
          </Popper>
        </>
      )}
    </Box>
  );
};

export default TabsNumeri;
