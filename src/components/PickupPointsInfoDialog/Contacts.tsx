import { EmailOutlined, LanguageOutlined, Phone } from "@mui/icons-material";
import {
  Divider,
  Link,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  SvgIconTypeMap,
  Typography,
} from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";
import React from "react";
import { useTranslation } from "src/hook/useTranslation";
import { RaddOperator } from "src/model";

type Props = {
  point: RaddOperator;
};

interface ContactItem {
  href: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
  text: string;
  target?: React.HTMLAttributeAnchorTarget;
  rel?: string;
}

const Contacts: React.FC<Props> = ({ point }) => {
  const { t } = useTranslation(["pickup"]);

  const [firstPhone, secondPhone] = point.contacts.split("_");

  const contacts: ContactItem[] = [];

  if (firstPhone) {
    contacts.push({
      href: `tel:${firstPhone}`,
      icon: Phone,
      text: firstPhone,
    });
  }

  if (secondPhone) {
    contacts.push({
      href: `tel:${secondPhone}`,
      icon: Phone,
      text: secondPhone,
    });
  }

  if (point.email) {
    contacts.push({
      href: `mailto:${point.email}`,
      icon: EmailOutlined,
      text: point.email,
    });
  }

  if (point.website) {
    contacts.push({
      href: point.website,
      icon: LanguageOutlined,
      text: point.website,
      target: "_blank",
      rel: "noopener noreferrer",
    });
  }

  return (
    <List>
      <Typography
        fontSize="16px"
        fontWeight={600}
        color="text.secondary"
        sx={{ px: 0, mb: 1 }}
      >
        {t("drawer.contacts")}
      </Typography>

      {contacts.map((contact, index) => (
        <React.Fragment key={contact.href}>
          {index > 0 && <Divider />}
          <ListItem sx={{ px: 0, py: 1 }}>
            <Link
              href={contact.href}
              target={contact.target}
              rel={contact.rel}
              style={{ textDecoration: "none", width: "100%", display: "flex" }}
            >
              <ListItemIcon>
                <contact.icon color="primary" sx={{ width: 24, height: 24 }} />
              </ListItemIcon>
              <ListItemText
                primary={
                  <Typography
                    variant="body2"
                    fontWeight={700}
                    color="primary"
                    sx={{
                      ml: 1,
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {contact.text}
                  </Typography>
                }
              />
            </Link>
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );
};

export default Contacts;
