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
import { useTabBehavior } from "src/hook/useTabBehavior";

type Props = {
  tabs: Array<string>;
  fullWidth?: boolean;
  buttonSize?: "small" | "medium" | "large";
  breakOnMobile?: boolean;
  onTabChange: (v: number) => void;
  initialTab?: number;
  breakpoint?: Breakpoint;
};

const Tabs = ({
  tabs,
  fullWidth = false,
  buttonSize = "large",
  breakOnMobile = true,
  onTabChange,
  initialTab = 0,
  breakpoint = "lg",
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

  return (
    <Box sx={{ textAlign: "center", width: fullWidth ? "100%" : "auto" }}>
      {(!isMobile || !breakOnMobile) && (
        <ButtonGroup color="primary" fullWidth={fullWidth}>
          {tabs.map((tab, index) => (
            <Button
              sx={{
                backgroundColor:
                  currentTab === index ? "rgba(0, 115, 230, 0.08)" : undefined,
              }}
              onClick={() => handleChangeTab(index)}
              size={buttonSize}
              value={index}
              key={tab}
            >
              {tab}
            </Button>
          ))}
        </ButtonGroup>
      )}
      {isMobile && breakOnMobile && (
        <>
          <ButtonGroup ref={anchorRef}>
            <Button onClick={handleToggleDropdown}>{tabs[currentTab]}</Button>
            <Button
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

export default Tabs;
