import React, { useState, useRef } from "react";
import QrReader from "modern-react-qr-reader";
import Button from "@mui/material/Button";
import { QrCodeScanner } from "@mui/icons-material";
import CloseIcon from "@mui/icons-material/Close";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import { ThemeProvider, createTheme } from "@mui/material/styles";

const ScanQr = () => {
  const [webScan, setWebScan] = useState(null);
  const [camera, setCamera] = useState(false);
  const [productDetails, setProductDetails] = useState(false);
  const [buttonVisible, setButtonVisible] = useState(true);
  const qrRef = useRef(null);
  const camError = (error) => {
    if (error) {
      console.info(error);
    }
  };
  const camScan = (result) => {
    if (result) {
      setWebScan(result);
      setProductDetails(true);
      setCamera(false)
    }
    // } else {
    //   console.log("bye");
    // }
  };

  const theme = createTheme();

  const addShadow = (content) => (
    <Box
      sx={{
        boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.2)",
        padding: "16px"
      }}
    >
      {content}
    </Box>
  );

  const card = (
    <React.Fragment>
      <CardContent>
        {addShadow(
          <Typography variant="h4" sx={{ textAlign: "center" }} gutterBottom>
            Product Details
          </Typography>
        )}
        {addShadow(
          <Typography variant="h6" sx={{ textAlign: "left" }} gutterBottom>
            <strong>Product ID:</strong> XYZ123
          </Typography>
        )}
        {addShadow(
          <Typography variant="h6" sx={{ textAlign: "left" }} gutterBottom>
            <strong>Material Used:</strong> Premium Steel
          </Typography>
        )}
        {addShadow(
          <Typography variant="h6" sx={{ textAlign: "left" }} gutterBottom>
            <strong>Weight:</strong> 5.2 lbs
          </Typography>
        )}
        {addShadow(
          <Typography variant="h6" sx={{ textAlign: "left" }} gutterBottom>
            <strong>Quantity:</strong> 100
          </Typography>
        )}
        {addShadow(
          <Typography variant="h6" sx={{ textAlign: "left" }} gutterBottom>
            <strong>Description:</strong> Lorem ipsum dolor sit amet,
            consectetur adipisicing elit. Doloremque laborum earum, rerum fuga
            reprehenderit tempora optio impedit vitae Lorem ipsum dolor sit
            amet, consectetur adipisicing elit. Doloremque laborum earum, rerum
            fuga reprehenderit tempora optio impedit vitae perferendis saepe
            consequuntur ipsam at, cum hic officia necessitatibus iure totam
            maiores. perferendis saepe consequuntur ipsam at, cum hic officia
            necessitatibus iure totam maiores.
          </Typography>
        )}

        {addShadow(
          <Typography variant="h6" sx={{ textAlign: "left" }} gutterBottom>
            <strong>Status:</strong> Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Doloremque laborum earum, rerum fuga reprehenderit
            tempora optio impedit vitae Lorem ipsum dolor sit amet, consectetur
            adipisicing elit. Doloremque laborum earum, rerum fuga reprehenderit
            tempora optio impedit vitae perferendis saepe consequuntur ipsam at,
            cum hic officia necessitatibus iure totam maiores. perferendis saepe
            consequuntur ipsam at, cum hic officia necessitatibus iure totam
            maiores.
          </Typography>
        )}
      </CardContent>
      <CardActions sx={{ justifyContent: "center" }}></CardActions>
    </React.Fragment>
  );

  const handleSubmit = () => {
    setCamera(true);
    setButtonVisible(false);
  };
  const handleCancel = () => {
    setButtonVisible(true);
    setCamera(false);
  };

  return (
    <>
      <div>
        <div className="card-body" height="100%">
          {buttonVisible && (
            <div className="center" style={centerStyle}>
              <Button
                onClick={handleSubmit}
                component="label"
                variant="contained"
                className="mt-4 mb-2"
                startIcon={<QrCodeScanner />}
              >
                Click Here to Scan QR Code
              </Button>
            </div>
          )}

          {(camera && webScan===null) ? (
            <div className="center" style={centerStyle}>
              <div>
                <div className="card">
                  <QrReader
                    ref={qrRef}
                    delay={300}
                    onError={camError}
                    onScan={camScan}
                    style={{ width: "100%" }}
                    facingMode={"user"}
                    onResult={(result, error) => {
                      if (result) {
                        setWebScan(result?.text);
                        setProductDetails(true);
                        setCamera(false);
                      }

                      if (error) {
                        console.info(error);
                      }
                    }}
                  />
                </div>
                <Button
                  onClick={handleCancel}
                  component="label"
                  variant="contained"
                  className="mt-4 mb-2"
                  startIcon={<CloseIcon />}
                >
                  Cancel Scanning
                </Button>
              </div>
            </div>
          ) : (
            " "
          )}
          {productDetails === true ? (
            <div>
              <ThemeProvider theme={theme}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100vh"
                  }}
                >
                  <Card
                    variant="outlined"
                    sx={{ width: "80%", height: "100%" }}
                  >
                    {card}
                  </Card>
                </Box>
              </ThemeProvider>

              <div className="center" style={backScan}>
                <Button
                  onClick={() => {
                    setProductDetails(false);
                    setButtonVisible(true);
                    setWebScan(null);
                  }}
                  component="label"
                  variant="contained"
                  className="mt-4 mb-2"
                  startIcon={<QrCodeScanner />}
                >
                  Back to Scanner
                </Button>
              </div>
            </div>
          ) : (
            " "
          )}
        </div>
      </div>
    </>
  );
};
const centerStyle = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  height: "40em"
};

const backScan = {
  display: "flex",
  justifyContent: "center",
  alignItems: "center"
};
export default ScanQr;
