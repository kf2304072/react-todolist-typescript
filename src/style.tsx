import styled from "@emotion/styled";
import { Container } from "@mui/material";


export const StyledContainer =styled(Container)({
    display: "flex",
    flexDirection: "column",
    alignItems:"center",
    justifyContent: "center",
    minHeight: "100vh"
});

export const InputArea = styled("div")({
    marginBottom: "20px",
    display: "flex",
    gap: "10px",
});


