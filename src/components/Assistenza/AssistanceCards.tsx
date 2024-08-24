import { Box, Button, Container, Stack } from "@mui/material";
import { useTranslation } from "../../hook/useTranslation";
import AssistanceCard, { CardProps } from "./AssistanceCard";
import React from "react";

export interface AssistanceCardsProps {
  cards: Array<CardProps>;
  button: {
    text: string;
    href: string;
  };
}

const AssistanceCards: React.FC<AssistanceCardsProps> = ({ cards, button }) => {
  const { t } = useTranslation(["assistenza"]);
  return (
    <>
      <Container maxWidth="xl" sx={{ mt: 4 }}>
        <Stack
          direction={{ lg: "row", xs: "column" }}
          spacing={2}
          justifyContent="center"
          sx={{
            alignItems: {
              lg: "flex-start",
              md: "center",
              sm: "center",
              xs: "center",
            },
          }}
        >
          <Stack
            direction={{ sm: "row", xs: "column" }}
            spacing={2}
            sx={{
              width: "100%",
              justifyContent: "center",
              alignItems: { sm: "flex-start", xs: "center" },
            }}
          >
            {cards.map((card) => (
              <AssistanceCard
                key={card.title}
                title={card.title}
                href={card.href}
                text={card.text}
              />
            ))}
          </Stack>
        </Stack>
      </Container>
      <Box sx={{ textAlign: "center", mt: 4, mb: 4 }}>
        <Button variant="contained" color="primary" href={button.href}>
          {button.text}
        </Button>
      </Box>
    </>
  );
};

export default AssistanceCards;
