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
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import React, { useState } from "react";
import "./JobCard.css";
import { capitalizeFirstWord } from "../../utils/util";

export default function JobCard({ jobData }) {
  const [showMore, setShowMore] = useState(false);
  const handleShowMore = () => {
    setShowMore(true);
  };

  const handleClose = () => {
    setShowMore(false);
  };

  const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: "20px",
    transition: "transform 0.15s ease-in-out",
    "&:hover": { transform: "scale3d(1.02, 1.02, 1)" },
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
  console.log(jobData)
  return (
    <Box className="jobCardContainer">
      <StyledCard>
        <Box className="timeChipBox">
          <Chip
            sx={{ fontSize: "9px", height: "20px", padding: "4px 6px" }}
            variant="outlined"
            label="⏳ Posted 6 day ago"
          />
        </Box>
        <CardContent>
          <Box>
            <Box className="logoContainer">
              <Box>
                <img width={"40px"} src={jobData?.logoUrl} alt="logo" />
              </Box>
              <div>
                <h3 className="companyName">{jobData?.companyName}</h3>
                <h2 className="role">
                  {capitalizeFirstWord(jobData?.jobRole)}
                </h2>
                <p className="location">
                  {capitalizeFirstWord(jobData?.location)}
                </p>
              </div>
            </Box>
            <Box className="salary">
            <span>{"Estimated Salary: "}</span>
            <span>
            {jobData?.minJdSalary !== null && jobData?.maxJdSalary !== null
              ? `${jobData.minJdSalary}k - ${jobData.maxJdSalary}k ${jobData.salaryCurrencyCode}`
              : jobData?.minJdSalary !== null
              ? `${jobData.minJdSalary}k ${jobData.salaryCurrencyCode}`
              : jobData?.maxJdSalary !== null
              ? `${jobData.maxJdSalary}k ${jobData.salaryCurrencyCode}`
              : 'Salary not provided'}
          </span>
          <span title="Estimated by Weekday. Not provided by employer">⚠️</span>
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
              {jobData?.minExp?
                <Box className="mgTop20">
                  <p component={"h3"} className="expContinerTextHeading">
                    Minimum Experience
                  </p>
                  <p component={"h2"} className="expContainerText">
                    {jobData?.minExp} years
                  </p>
                </Box>:<Box  sx={{height:"60px"}}></Box>
              }
                
                <Box className="buttonContainer">
                  <Button
                    sx={{
                      width: "100%",
                      backgroundColor: "#55efc4",
                      padding: "8px 18px",
                      fontWeight: "500",
                      color: "black",
                      ":hover": {
                        bgcolor: "#55efc4", 
                        color: "black",
                      },
                    }}
                  >
                    {"⚡ Easy Apply"}
                  </Button>
                  <Button
                    sx={{
                      width: "100%",
                      backgroundColor: "#4943da",
                      padding: "8px 18px",
                      display:"flex",
                      gap:"3px",
                      fontWeight: "500",
                      color: "white",
                      ":hover": {
                        bgcolor: "#4943da", 
                        color: "white",
                      },
                      
                    }}
                  >
                  <Box>
                    <AvatarGroup max={2}>
                      <Avatar sx={{ width: 20, height: 20 }} alt="Remy Sharp" src="" />
                      <Avatar
                      sx={{ width: 20, height: 20 }}
                        alt="Travis Howard"
                        src=""
                      />
                    </AvatarGroup>
                    </Box>
                    <Box>
                    <Typography className="buttonText">{"Ask for referral"}</Typography>
                    </Box>
                  </Button>
                </Box>
              </Box>
              <Dialog open={showMore} onClose={handleClose}>
                <DialogContent>
                  <p variant="body1">{""}</p>
                </DialogContent>
              </Dialog>
            </Box>
          </Box>
        </CardContent>
      </StyledCard>
    </Box>
  );
}
