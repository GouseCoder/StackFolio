import { Box } from "@mui/material";

export default function BlogContent({ content }) {
  return (
    <Box
      sx={{
        textAlign: "left",
        "& img": { maxWidth: "100%", borderRadius: 2, mt: 2, mb: 2 },
        "& h1,h2,h3,h4": { mt: 2, mb: 1 },
        "& p": { lineHeight: 1.7 },
      }}
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
}
