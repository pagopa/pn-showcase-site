const colors = [
  "blue-io",
  "blue-io-50",
  "blue-io-200",
  "primary",
  "secondary",
  "grey-650",
  "grey-700",
  "alert",
  "alert-border",
  "icon",
  "icon-bg",
] as const;

type Colors = (typeof colors)[number];

export const dashboardColors: ReadonlyMap<Colors, string> = new Map([
  ["blue-io", "#0B3EE3"],
  ["blue-io-50", "#E7ECFC"],
  ["blue-io-200", "#9DB2F4"],
  ["primary", "#17324D"],
  ["secondary", "#5C6F82"],
  ["grey-650", "#636B82"],
  ["grey-700", "#555C70"],
  ["alert-border", "#89D9FC"],
  ["alert", "#E0F5FE"],
  ["icon", "#215C76"],
]);
