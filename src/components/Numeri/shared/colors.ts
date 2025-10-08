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
  "success-100",
  "success-850",
  "error-100",
  "error-850",
  "yellow-100",
  "yellow-850",
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
  ["success-100", "#E1F4E1"],
  ["success-850", "#224021"],
  ["error-100", "#FBE4E4"],
  ["error-850", "#772727"],
  ["yellow-100", "#FFFBE6"],
  ["yellow-850", "#FFB900"],
]);
