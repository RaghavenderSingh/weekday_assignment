import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Dialog,
  DialogContent,
  Typography,
  styled,
} from "@mui/material";
import React, { useState } from "react";
import "./JobCard.css";

export default function JobCard({ jobData }) {
  const [showMore, setShowMore] = useState(false);
  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleClose = () => {
    setShowMore(false);
  };
  const options = {
    shouldForwardProp: (prop) => prop !== "hoverShadow",
  };
  const StyledCard = styled(
    Card,
    options
  )(({ theme, hoverShadow = 1 }) => ({
    ":hover": {
      boxShadow: theme.shadows[hoverShadow],
    },
  }));
  const FadedText = styled(Typography)(({ theme }) => ({
    position: "relative",
    maxHeight: "200px",
    fontWeight: 200,
    fontSize: "14px",
    color: "rgba(0, 0, 0, 0.87)",
    overflow: "hidden",
    "&::after": {
      content: '""',
      position: "absolute",
      bottom: 0,
      left: 0,
      width: "100%",
      height: "10rem",
      background: `linear-gradient(to bottom, rgba(255, 255, 255, 0), ${theme.palette.background.default})`,
    },
  }));
  return (
    <StyledCard className="jobCardContainer">
      <Box className="timeChipBox">
        <Chip size="small" variant="outlined" label="⏳ Posted 6 day ago" />
      </Box>
      <CardContent>
        <Box>
          <Box className="logoContainer">
            <Box>
              <img width={"40px"} src={jobData?.logoUrl} alt="" />
            </Box>
            <div>
              <h3 className="companyName">{jobData?.companyName}</h3>
              <h2 className="role">{jobData?.jobRole}</h2>
              <p className="location">
                {jobData?.location}
              </p>
            </div>
          </Box>
          <Box>
            <p className="salary">{`Estimated Salary ₹${ jobData?.minJdSalary} - ₹${jobData?.maxJdSalary} LPA  ⚠️`}</p>
          </Box>
          <Box className="mgTop10">
            <p className="aboutCompneyHeader">About Company:</p>
            <Box className="details">
              <FadedText variant="body1">
                {jobData?.jobDetailsFromCompany}
              </FadedText>
            </Box>
            <Box className="viewJobButtonContainer">
              <p
                variant="contained"
                className="showmoreButton"
                onClick={handleShowMore}
              >
                View job
              </p>
            </Box>
            <Box>
              <Box className="mgTop20">
                <p component={"h3"} className="expContinerTextHeading">
                  Minimum Experience
                </p>
                <p component={"h2"} className="expContainerText">
                  {jobData?.minExp} years
                </p>
              </Box>
              <Box className="buttonContainer">
                <Button  sx={{
                  width: "100%",
                  backgroundColor: "#55efc4",
                  padding: "8px 18px",
                  fontWeight: "500",
                  color: "black",
                  ":hover": {
                    bgcolor: "#55efc4", // theme.palette.primary.main
                    color: "black",
                  },
                }}>{"Easy Apply"}</Button>
                <Button sx={{
                  width: "100%",
                  backgroundColor: "#4943da",
                  padding: "8px 18px",
                  fontWeight: "500",
                  color: "white",
                  ":hover": {
                    bgcolor: "#4943da", // theme.palette.primary.main
                    color: "white",
                  },
                }}>{"Ask for referral"}</Button>
              </Box>
            </Box>
            <Dialog open={showMore} onClose={handleClose}>
              <DialogContent>
                <p variant="body1">{"bjh"}</p>
              </DialogContent>
            </Dialog>
          </Box>
        </Box>
      </CardContent>
    </StyledCard>
  );
}
