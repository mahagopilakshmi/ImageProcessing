//requiring the modules
import React from "react";
import ReactDOM from "react-dom";
import Dropzone from "react-dropzone";
import { withStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import SaveIcon from "@material-ui/icons/Save";
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Slider from "@material-ui/lab/Slider";
import { CircularProgress } from "@material-ui/core";

//setting the style
const styles = theme => ({
  layout: {
    width: "auto",
    display: "block",
    marginTop: theme.spacing.unit * 10,
    marginLeft: theme.spacing.unit * 3,
    marginRight: theme.spacing.unit * 3,
    [theme.breakpoints.up(400 + theme.spacing.unit * 3 * 2)]: {
      width: 400,
      marginLeft: "auto",
      marginRight: "auto"
    }
  },
  card: {
    width: 300
  },
  media: {
    height: 300
  },
  root: {
    flexGrow: 1
  },
  grow: {
    flexGrow: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
});

class App extends React.Component {
  state = {
    file: null,
    imagePreviewUrl: "",
    brightness: 5,
    contrast: 4,
    saturation: 1,
    gamma: 1,
    loading: false,
    err: null
  };

  //handler for adding image form local disk
  onDrop = files => {
    this.setState(
      {
        file: files[0],
        imagePreviewUrl: files[0].preview
      },
      () => {
        this.onApply();
      }
    );
  };
  //handler to change brightness
  onBrightnessChange = (e, v) => {
    this.setState({ brightness: v });
  };
  //handler to change contrast
  onContrastChange = (e, v) => {
    this.setState({ contrast: v });
  };
  //handler to change saturation
  onSatChange = (e, v) => {
    this.setState({ saturation: v });
  };
  //handler to change gamma
  onGammaChange = (e, v) => {
    this.setState({ gamma: v });
  };
  //handler to apply the changes made
  onApply = () => {
    const {
      imagePreviewUrl,
      brightness,
      contrast,
      saturation,
      gamma
    } = this.state;
    window.Caman("#imgPreview", imagePreviewUrl, function() {
      this.revert();
      this.brightness(brightness)
        .contrast(contrast)
        .saturation(saturation)
        .gamma(gamma)
        .render();
    });
  };
  //handler to cancel the changes
  onCancel = () => {
    this.setState({ imagePreviewUrl: "", file: null, loading: false });
  };
  //handler to upload the image to the database
  onUpload = async () => {
    const { file, brightness, contrast, saturation, gamma } = this.state;
    const can = document.getElementById("imgPreview");
    const data = can.toDataURL().replace("data:image/png;base64,", "");
    await fetch("http://localhost:3001/upload", {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8"
      },
      body: JSON.stringify({
        name: file.name,
        data,
        settings: {
          brightness,
          contrast,
          saturation,
          gamma
        }
      })
    });
    this.onCancel();
  };

  render() {
    const { classes } = this.props;
    const {
      imagePreviewUrl,
      brightness,
      contrast,
      saturation,
      gamma,
      loading
    } = this.state;
    return (
      <React.Fragment>
        <CssBaseline />
        <AppBar position="static">
          <Toolbar variant="dense">
            <IconButton color="inherit" aria-label="Menu">
              <MenuIcon />
            </IconButton>
            <Typography
              variant="title"
              color="secondary"
              align="center"
              className={classes.grow}
            >
              Image Processing Techniques
            </Typography>
            {loading && <CircularProgress className={classes.progress} />}
            {!loading && (
              <IconButton
                color="inherit"
                aria-label="Save"
                disabled={imagePreviewUrl === ""}
                onClick={this.onUpload}
              >
                <SaveIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
        <div className={classes.layout}>
          <Card className={classes.card}>
            <Dropzone
              disabled={imagePreviewUrl !== ""}
              style={{}}
              className=""
              accept="image/jpeg, image/png"
              onDrop={this.onDrop}
            >
              {imagePreviewUrl && (
                <canvas
                  id="imgPreview"
                  width={600}
                  height={300}
                  src={imagePreviewUrl}
                  alt="preview"
                />
              )}
              {!imagePreviewUrl && (
                <CardActionArea>
                  <CardContent>
                    <Typography gutterBottom variant="headline" component="h2">
                      Upload Image
                    </Typography>
                    <Typography component="p">
                      Try dropping some images here, or click to select files to
                      upload.
                    </Typography>
                  </CardContent>
                </CardActionArea>
              )}
            </Dropzone>
            {imagePreviewUrl && (
              <CardContent>
                <React.Fragment>
                  <Typography component="p">Brightness</Typography>
                  <Slider
                    value={brightness}
                    aria-labelledby="label"
                    min={1}
                    max={20}
                    onChange={this.onBrightnessChange}
                  />
                </React.Fragment>
                <React.Fragment>
                  <Typography component="p">Contrast</Typography>
                  <Slider
                    value={contrast}
                    aria-labelledby="label"
                    min={-10}
                    max={20}
                    onChange={this.onContrastChange}
                  />
                </React.Fragment>
                <React.Fragment>
                  <Typography component="p">Saturation</Typography>
                  <Slider
                    value={saturation}
                    aria-labelledby="label"
                    min={1}
                    max={100}
                    onChange={this.onSatChange}
                  />
                </React.Fragment>
                <React.Fragment>
                  <Typography component="p">Gamma</Typography>
                  <Slider
                    value={gamma}
                    aria-labelledby="label"
                    min={1}
                    max={10}
                    onChange={this.onGammaChange}
                  />
                </React.Fragment>
              </CardContent>
            )}
            {imagePreviewUrl && (
              <CardActions>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={this.onApply}
                >
                  Apply
                </Button>
                <Button
                  size="small"
                  color="primary"
                  variant="contained"
                  onClick={this.onCancel}
                >
                  Cancel
                </Button>
              </CardActions>
            )}
          </Card>
        </div>
      </React.Fragment>
    );
  }
}

const StyledApp = withStyles(styles)(App);

//rendering the component
ReactDOM.render(<StyledApp />, document.getElementById("root"));
