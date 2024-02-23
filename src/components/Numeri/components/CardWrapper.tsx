type Props = {
  className?: string;
  cardClass?: string;
  children: React.ReactNode;
};
const CardWrapper = ({
  className,
  cardClass,
  children,
}: Props): JSX.Element => {
  return (
    <div
      className={[
        "card card-bg h-100 m-0 no-after ",
        className,
        cardClass,
      ].join(" ")}
    >
      <div className="card-body p-3">{children}</div>
    </div>
  );
};

export default CardWrapper;
