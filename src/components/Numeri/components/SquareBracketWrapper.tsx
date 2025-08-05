type Props = {
  children: React.ReactNode;
};

export default function SquareBracketWrapper({ children }: Props) {
  return <>[{children}]</>;
}
