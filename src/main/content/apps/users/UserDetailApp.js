import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { FuseUtils, FuseAnimate } from "@fuse";
import AutoComplete from "react-select";
// import { helperService } from "../../../../helper/helperService";

import {
  // Checkbox,
  Grid,
  TextField,
  InputLabel,
  FormControl,
  Select,
  Input,
} from "@material-ui/core";
// import  Select from 'react-select';
import Typography from "@material-ui/core/Typography";
// import NoSsr from "@material-ui/core/NoSsr";
import Paper from "@material-ui/core/Paper";
import Chip from "@material-ui/core/Chip";
import MenuItem from "@material-ui/core/MenuItem";
import CancelIcon from "@material-ui/icons/Cancel";
// import DeleteIcon from '@material-ui/icons/Delete';
import { emphasize } from "@material-ui/core/styles/colorManipulator";
import { bindActionCreators } from "redux";
import * as Actions from "./store/actions";
import withReducer from "store/withReducer";
import reducer from "./store/reducers";
import ReactTable from "react-table";
import classNames from "classnames";
// import FormControlLabel from "@material-ui/core/FormControlLabel";
// import Switch from "@material-ui/core/Switch";
// import { Link } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Button from "@material-ui/core/Button";
import Fab from "@material-ui/core/Fab";
import CloseIcon from "@material-ui/icons/Close";
import "react-toastify/dist/ReactToastify.css";
import { Icon, Tooltip } from "@material-ui/core";
import GoogleMap from "google-map-react";
import { fitBounds } from "google-map-react/utils";
// import { TablePagination } from "@trendmicro/react-paginations";
import "@trendmicro/react-paginations/dist/react-paginations.css";

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
  root: {
    // display: 'flex',
    // flexWrap: 'wrap',
    // flex: 1,
    // justifyContent: 'space-around',
    // overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "100%",
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  },
  gridItem: {
    // boxShadow: '0px 1px 3px 0px rgba(0, 0, 0, 0.2), 0px 1px 1px 0px rgba(0, 0, 0, 0.14), 0px 2px 1px -1px rgba(0, 0, 0, 0.12)',
    padding: theme.spacing.unit * 2,
    marginTop: theme.spacing.unit * 4,
  },
  formContainer: {},
  textField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    width: "100%",
  },
  selectField: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
    marginTop: theme.spacing.unit * 2,
    width: "100%",
  },
  row: {
    display: "flex",
	},
	nameRow: {
		width: '75%'
	},
  subTitle: {
    height: 'auto',
    paddingBottom: 16,
    flexDirection: 'row',
    alignItems: 'center'
  },
  subTitleWrapper: {
    display: 'flex',
    width: '50%',
    justifyContent: 'flex-start'
  },
  gmapButtonWrapper: {
    width: '50%',
    justifyContent: 'flex-end'
  },
  input: {
    display: "flex",
    padding: 0,
  },
  valueContainer: {
    display: "flex",
    flexWrap: "wrap",
    flex: 1,
    alignItems: "center",
    overflow: "hidden",
  },
  chips: {
    display: "flex",
    flexWrap: "wrap",
  },

  chip: {
    margin: `${theme.spacing.unit / 2}px ${theme.spacing.unit / 4}px`,
  },

  chipFocused: {
    backgroundColor: emphasize(
      theme.palette.type === "light"
        ? theme.palette.grey[300]
        : theme.palette.grey[700],
      0.08,
    ),
  },
  noOptionsMessage: {
    padding: `${theme.spacing.unit}px ${theme.spacing.unit * 2}px`,
  },
  singleValue: {
    fontSize: 16,
  },
  placeholder: {
    position: "absolute",
    left: 2,
    fontSize: 16,
  },
  paper: {
    position: "absolute",
    zIndex: 999,
    marginTop: theme.spacing.unit,
    left: 0,
    right: 0,
  },
  divider: {
    height: theme.spacing.unit * 2,
  },
  toastContainer: {
    zIndex: 1000,
    marginTop: theme.spacing.unit * 15,
    marginRight: theme.spacing.unit * 5,
    position: "fixed",
  },
  googleMapOverlay: {
    height: "100vh",
    width: "100vw",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    position: "fixed",
    zIndex: 10000,
    backgroundColor: "#00000069",
    padding: "10%",
    top: 0,
  },
  mapCloseButton: {
    marginTop: 20,
    color: "black",
	},
	deleteImgButton: {
		fontSize: '0.8em',
		padding: '5px'
	},
  mapFooter: {
    textAlign: "center",
  },
  buttonRow: {
		marginTop: "30px",
		justifyContent: "flex-end"
  },
  detailCol: {
    borderRight: "1px solid #eeeeee",
	},
	imageRow: {
    display: "flex",
    margin: "auto",
    width: '25%'
  },
	image: {
    width: "120px",
    marginBottom: "10px"
  },
  imageWrapper: {
    display: "flex",
    /* align-items: center; */
    flexDirection: "column",
    paddingTop: "15px"
  },

  msgRow: {
    marginTop: theme.spacing.unit * 3,
    paddingRight: theme.spacing.unit,
    height: theme.spacing.unit * 10
  },
  msgField: {
    width: '90%',
    paddingRight: '30px'
  },
  msgButtonDiv: {
    display: 'flex',
    width: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  msgButton: {
    backgroundColor: 'green',
    color: 'white'
  },
  internalNote: {
    marginLeft: theme.spacing.unit,
    marginRight: theme.spacing.unit,
  }
});

function NoOptionsMessage(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.noOptionsMessage}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function inputComponent({ inputRef, ...props }) {
  return <div ref={inputRef} {...props} />;
}

function Control(props) {
  return (
    <TextField
      id={props.selectProps.id}
      label={props.selectProps.label}
      value={props.selectProps.value.value}
      fullWidth
      InputProps={{
        inputComponent,
        inputProps: {
          className: props.selectProps.classes.input,
          inputRef: props.innerRef,
          children: props.children,
          ...props.innerProps,
        },
      }}
      {...props.selectProps.textFieldProps}
      onChange={evt => console.log(evt)}
    />
  );
}

function Option(props) {
  return (
    <MenuItem
      buttonRef={props.innerRef}
      selected={props.isFocused}
      component="div"
      style={{
        fontWeight: props.isSelected ? 500 : 400,
      }}
      {...props.innerProps}
    >
      {props.children}
    </MenuItem>
  );
}

function Placeholder(props) {
  return (
    <Typography
      color="textSecondary"
      className={props.selectProps.classes.placeholder}
      {...props.innerProps}
    >
      {props.selectProps.placeholder}
    </Typography>
  );
}

function SingleValue(props) {
  return (
    <Typography
      className={props.selectProps.classes.singleValue}
      {...props.innerProps}
    >
      {props.children}
    </Typography>
  );
}

function ValueContainer(props) {
  return (
    <div className={props.selectProps.classes.valueContainer}>
      {props.children}
    </div>
  );
}

function MultiValue(props) {
  return (
    <Chip
      tabIndex={-1}
      label={props.children}
      className={classNames(props.selectProps.classes.chip, {
        [props.selectProps.classes.chipFocused]: props.isFocused,
      })}
      onDelete={props.removeProps.onClick}
      deleteIcon={<CancelIcon {...props.removeProps} />}
    />
  );
}

function Menu(props) {
  return (
    <Paper
      square
      className={props.selectProps.classes.paper}
      {...props.innerProps}
    >
      {props.children}
    </Paper>
  );
}

const components = {
  Control,
  Menu,
  MultiValue,
  NoOptionsMessage,
  Option,
  Placeholder,
  SingleValue,
  ValueContainer,
};
// Get Distance String with two digits after point.
function getDistanceString(number) {
  var num = Math.floor(number * 100) / 100;
  var result =
    Number(num.toFixed(0))
      .toLocaleString("en-US")
      .split(",")
      .join(" ") +
    "." +
    Number(
      num.toString().slice(num.toString().indexOf(".") + 1),
    ).toLocaleString();
  return result;
}

function Marker({ text }) {
  return (
    <Tooltip title={text} placement="top">
      <Icon className="text-red">place</Icon>
    </Tooltip>
  );
}

const MapOverLay = props => {
  return (
    <div className={classNames(props.classes.googleMapOverlay, "w-full")}>
      <div className="w-full h-512">
        <GoogleMap
          bootstrapURLKeys={{
            key: process.env.REACT_APP_MAP_KEY,
          }}
          defaultZoom={props.zoom}
          defaultCenter={props.center}
        >
          {props.pings.map((ping, index) => (
            <Marker
              key={index}
              text={ping.epoch}
              lat={ping.location.lat}
              lng={ping.location.lng}
            />
          ))}
        </GoogleMap>
        <div className={classNames(props.classes.mapFooter, "w-full")}>
          <Fab
            size="medium"
            aria-label="Close Map"
            className={props.classes.mapCloseButton}
            onClick={props.closeMap}
          >
            <CloseIcon />
          </Fab>
        </div>
      </div>
    </div>
  );
};

class UserDetailApp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: {},
      checkedA: true,
      checkedB: true,
      checkedA1: true,
      checkedB1: true,
      selectedContactsMenu: null,
      showMap: false,
      groups: [],
      page: 1,
      pageLength: 500,
      totalRecords: 100,
      boxWidth: 800,
      width: 1990,
      imageLoaded: null,
      dialogOpen: false,
      trailPingToShow: null,
      message: '',
      helperText: '',
      isAdmin: false
    };

    this.userDetailChange = this.userDetailChange.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.updateBoxWidth = this.updateBoxWidth.bind(this);
    this.handleNo = this.handleNo.bind(this);
    this.setMessage = this.setMessage.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };

  componentWillMount() {
    this.updateBoxWidth();
  }
  componentDidMount() {
    // Get user detail
    if (this.props.match.params.id) {
      try {
        this.props.getUserDetail(this.props.match.params.id);
        this.setState({
          user: this.props.user,
				});
      } catch (e) {
        // alert(e);
        console.log(e);
      }
    }

    // Get Countries and Ariports
    this.props.getCountries();
    this.props.getAirports();
    this.props.getPings(this.props.match.params.id);
    this.props.getTotalRecords(this.props.match.params.id);
    this.props.getTrailPings(
      this.props.match.params.id,
      this.state.pageLength,
      this.state.page,
    );

    this.props.getGroups();

    window.addEventListener("resize", this.updateBoxWidth);
    // Check is Admin for logined user
    const loginedUserInfo = JSON.parse(localStorage.user);
    if (loginedUserInfo.role === 'admin' && localStorage.env === 'production') {
      this.setState({
        isAdmin: true,
      });
    } else {
      this.setState({
        helperText: localStorage.env === 'staging' ? "Can't Send on the staging":"Only Admin User can send message!"
      });
    }
  }
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateBoxWidth);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.user) {
      this.checkImageLoaded(nextProps.user.imageurl);
    }
  }
  updateBoxWidth() {
    var w = window,
      d = document,
      documentElement = d.documentElement,
      body = d.getElementsByTagName("body")[0],
      width = w.innerWidth || documentElement.clientWidth || body.clientWidth;

    if (width > 960) {
      this.setState({
        boxWidth: width / 2 - 80,
      });
    } else {
      this.setState({
        boxWidth: width - 80,
      });
    }
  }

  getColumnWidth(accessor) {
    if (this.state.boxWidth < 620) {
      switch (accessor) {
        case "name":
          return 270;
        case "type":
          return 80;
        case "count":
          return 80;
        case "lastvisit":
          return 150;
        default:
          return 500;
      }
    } else {
      switch (accessor) {
        case "name":
          return this.state.boxWidth * 0.5;
        case "type":
          return this.state.boxWidth * 0.15;
        case "count":
          return this.state.boxWidth * 0.15;
        case "lastvisit":
          return this.state.boxWidth * 0.2;
        default:
          return this.state.boxWidth * 0.4;
      }
    }
  }
  getFilteredArray = (entities, searchText) => {
    const arr = Object.keys(entities).map(id => entities[id]);
    if (searchText.length === 0) {
      return arr;
    }
    return FuseUtils.filterArrayByString(arr, searchText);
  };

  openSelectedContactMenu = event => {
    this.setState({ selectedContactsMenu: event.currentTarget });
  };

  closeSelectedContactsMenu = () => {
    this.setState({ selectedContactsMenu: null });
  };

  userDetailChange = (propertyName, userObject, val) => {
    userObject[propertyName] = val;

    if (userObject["country"].value != null) {
      userObject["country"] = userObject.country.value;
    }
    if (userObject["homeairport"].value != null) {
      userObject["homeairport"] = userObject.homeairport.value;
    }

    this.setState({ user: userObject });
    console.log(this.state.user);
  };

  saveDetail = () => {
    this.props.updateUserDetail(this.state.user);
  };

  showMap = event => {
    event.preventDefault();
    this.setState({
      showMap: true,
    });
  };

  closeMap = () => {
    this.setState({
      showMap: false,
      trailPingToShow: null
    });
  };

  formatDateTime(datetime) {
    var formattedDateTime = "0000-00-00 00:00";
    if (datetime !== undefined) {
      const date = datetime.substr(0, 10);
      const time = datetime.substr(11, 5);

      formattedDateTime = date + " " + time;
    }
    return formattedDateTime;
  }

  getCenterZoom = (pings, size) => {
    var minLat = pings[0].location.lat;
    var maxLat = pings[0].location.lat;
    var minLng = pings[0].location.lng;
		var maxLng = pings[0].location.lng;
    pings.map(ping => {
      if (ping.location.lat > maxLat) maxLat = ping.location.lat;
      if (ping.location.lat < minLat) minLat = ping.location.lat;
      if (ping.location.lng > maxLng) maxLng = ping.location.lng;
      if (ping.location.lng < minLng) minLng = ping.location.lng;

      return true;
    });

    const bounds = {
      ne: {
        lat: maxLat,
        lng: maxLng,
      },
      sw: {
        lat: minLat,
        lng: minLng,
      },
    };

    size = {
      width: 600,
      height: 400,
    };
    const { center, zoom } = fitBounds(bounds, size);
    return { center, zoom };
  };

  onPageChange = (page, pageLength) => {
    this.setState(
      {
        page: page,
        pageLength: pageLength,
      },
      () => {
        this.props.getTrailPings(
          this.props.match.params.id,
          this.state.pageLength,
          this.state.page,
        );
      },
    );
  };

  handleOk = (userInfo) => {
    this.setState({
      dialogOpen: false
    });

    this.userDetailChange("imageurl", userInfo, "");
  }

  handleNo = () => {
    this.setState({
      dialogOpen: false
    })
  }

  checkImageLoaded = (url) => {
    if ( this.state.imageLoaded != null || url === undefined ) {
      return;
    }

    var xhr = new XMLHttpRequest();
    xhr.open('HEAD', url, true);
    xhr.onreadystatechange = () => {
      if ( xhr.readyState === 4 ) {
        if ( xhr.status === 200 ) {
          this.setState({
            imageLoaded: true
          });
          return;
        } else {
          this.setState({
            imageLoaded: false
          });
          return;
        }
      }
    };
    xhr.send(null);
  }

  sendMessage() {
    if (this.state.message !== '') {
      const userId = this.props.user.userkey;
      // const loginedUserInfo = JSON.parse(localStorage.user);
      const msgTitle = "Message from Yebo!World HQ";
      if (this.props.sendMessage(userId, msgTitle, this.state.message)) {
        this.setState({
          helperText: "Message sent successfully!",
          message: ""
        })
      } else {
        this.setState({
          helperText: "Something Happend! Try Again!"
        })
      };
    } else {
      this.setState({
        helperText: "Please type your message!"
      });
    }

  }

  // Admin To User Message Function
  setMessage = (value) => {
    if (value.length > 160) {
      this.setState({
        helperText: 'Messaget should 160 characters only!'
      });
      return;
    } else {
      this.setState({
        helperText: ''
      });
    }
    this.setState({
      message: value
    });
  }

  // Delete function
  handleDelete =(userInfo, value) => () => {

    var groups = userInfo.groups;
    for( var i = 0; i < groups.length; i++){
      if ( groups[i] === value) {
        groups.splice(i, 1);
      }
    }

    userInfo['groups'] = groups;

    this.setState({ user: userInfo });

  }

  isEmpty = (obj) => {
    for(var prop in obj) {
      if(obj.hasOwnProperty(prop))
          return false;
    }

    return JSON.stringify(obj) === JSON.stringify({});
  }


  render() {
    const {
      classes,
      // theme,
      // contacts,
      // selectedContactIds,
      // selectAllContacts,
      // deSelectAllContacts,
      // toggleInSelectedContacts,
      countries,
      airports,
      pings,
      groups,
      trailPings
      // totalRecords,
    } = this.props;

    const country_options = countries.map(country => ({
      value: country.name,
      label: country.name,
    }));

    const airport_options = airports.map(airport => ({
      value: airport.name,
      label: airport.name,
    }));

    const defaultInfo = {
      userId: "",
      name: "",
      displayname: "",
      city: "",
      country: null,
      email: "",
      groups: [],
      gxp: "",
      yeborank: "",
      totaldistance: 0,
      frequency: "",
      ygi: 0,
      homeairport: null,
      tagline: "",
      defaultProfileImageUrl: 'assets/images/avatars/profile.jpg',
      imageWidth: 0,
      internalnote: ""
    };


    let userInfo = Object.assign(defaultInfo, this.state.user);

    if (Object.keys(this.state.user).length === 0) {
      userInfo = Object.assign(defaultInfo, this.props.user);
    }
    let country_val = "";
    let homeairport_val = "";

    if (userInfo.country != null) {
      if (userInfo.country.value == null) {
        country_val = userInfo.country;
      } else {
        country_val = userInfo.country.value;
      }
    }

    if (userInfo.homeairport != null) {
      if (userInfo.homeairport.value == null) {
        homeairport_val = userInfo.homeairport;
      } else {
        homeairport_val = userInfo.homeairport.value;
      }
    }

    userInfo = Object.assign(defaultInfo, {
      country: { label: country_val, value: country_val },
    });
    userInfo = Object.assign(defaultInfo, {
      homeairport: { label: homeairport_val, value: homeairport_val },
    });

    let center, zoom;
    if (pings.length > 0) {
      if (pings.length === 1) {
        center = {
          lat: pings[0].location.lat,
          lng: pings[0].location.lng,
        };
      } else {
        center = this.getCenterZoom(pings).center;
        zoom = this.getCenterZoom(pings).zoom;
      }
    } else {
      center = [0, 0];
      zoom = 1;
    }

    // const selectStyles = {
    //   input: base => ({
    //     ...base,
    //     color: theme.palette.text.primary,
    //     '& input': {
    //       font: 'inherit',
    //     },
    //   }),
    // };

    console.log(userInfo);
    return (
      <div className={classes.root}>
        <ToastContainer className={classes.toastContainer} />
        <Dialog
            open={this.state.dialogOpen}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            >
            <DialogTitle id="alert-dialog-title">{"Are you sure?"}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Do you really want to delete this image? yes/no
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={this.handleNo} color="primary">No</Button>
                <Button onClick={() => this.handleOk(userInfo)} color="primary" autoFocus>Yes</Button>
            </DialogActions>
        </Dialog>
        {this.state.showMap && (
          <MapOverLay
            center={this.state.trailPingToShow ? this.state.trailPingToShow[0].location : center}
            zoom={this.state.trailPingToShow ? 10 : zoom}
            pings={this.state.trailPingToShow ? this.state.trailPingToShow : pings}
            classes={classes}
            closeMap={this.closeMap}
          />
        )}
        <Grid container className={classes.gridList}>
          <Grid
            item
            xs={12}
            sm={6}
            className={classNames(classes.gridItem, classes.detailCol)}
          >
            <div className={classes.row}>
              <strong> User Details </strong>
            </div>
            <form
              className={classes.formContainer}
              noValidate
              autoComplete="off"
            >
              {/* User Detail Start */}
              <div className={classes.row}>
								<div className={classes.nameRow}>
									<div className={classes.row}>
										<TextField
											id="displayname"
											label="Display Name"
											className={classes.textField}
											value={userInfo.displayname}
											onChange={evt =>
												this.userDetailChange(
													"displayname",
													userInfo,
													evt.target.value,
												)
											}
											margin="normal"
										/>
									</div>
									<div className={classes.row}>
										<TextField
											id="name"
											label="Real Name"
											className={classes.textField}
											value={userInfo.name}
											onChange={evt =>
												this.userDetailChange("name", userInfo, evt.target.value)
											}
											margin="normal"
										/>
									</div>
								</div>
								<div className={classes.imageRow}>
											<div className={classes.imageWrapper}>
												<img className={classes.image}   src={(userInfo.imageurl !== "") ?  userInfo.imageurl : defaultInfo.defaultProfileImageUrl} alt={userInfo.name + "'s photo"}/>
												<Button variant="contained" color="secondary" className={classes.deleteImgButton} onClick={ () => this.setState({dialogOpen: true})} disabled={userInfo.imageurl === ""}>
													Delete Image
													{/* <DeleteIcon className={classes.rightIcon} /> */}
												</Button>
											</div>
								</div>
              </div>

              <div className={classes.row}>
                <TextField
                  id="city"
                  label="Resident City"
                  className={classes.textField}
                  value={userInfo.city}
                  onChange={evt =>
                    this.userDetailChange("city", userInfo, evt.target.value)
                  }
                  margin="normal"
                />
              </div>
              <div className={classes.row}>
                <AutoComplete
                  id="country"
                  label="Resident country"
                  classes={classes}
                  className={classes.selectField}
                  components={components}
                  value={userInfo.country}
                  options={country_options}
                  placeholder="Select a Country..."
                  onChange={evt =>
                    this.userDetailChange(
                      "country",
                      userInfo,
                      evt != null ? evt.value : "",
                    )
                  }
                  isClearable
                />
              </div>
              <div className={classes.row}>
                <AutoComplete
                  id="homeairport"
                  label="Home Airport"
                  classes={classes}
                  className={classes.selectField}
                  components={components}
                  value={userInfo.homeairport}
                  options={airport_options}
                  placeholder="Select a Home Air Port..."
                  onChange={evt => {
                    this.userDetailChange(
                      "homeairport",
                      userInfo,
                      evt != null ? evt.value : "",
                    );
                  }}
                  isClearable
                />
              </div>
              <div className={classes.row}>
                <TextField
                  id="email"
                  label="Email"
                  className={classes.textField}
                  value={userInfo.email}
                  onChange={evt =>
                    this.userDetailChange("email", userInfo, evt.target.value)
                  }
                  margin="normal"
                />
              </div>
              <div className={classes.row}>
                <TextField
                  id="tagline"
                  label="Tagline"
                  className={classes.textField}
                  value={userInfo.tagline}
                  onChange={evt =>
                    this.userDetailChange("tagline", userInfo, evt.target.value)
                  }
                  margin="normal"
                />
              </div>
              <div className={classes.row}>
                {/* <UserCategory
									userCategory={userInfo.groups[0]}
									onChangeHandler={(evt)=>this.userDetailChange('groups', userInfo, evt.target.value)}
								/> */}
                <FormControl
                  className={classNames(
                    classes.formControl,
                    classes.selectField,
                  )}
                >
                  <InputLabel htmlFor="category-simple">
                    User Category
                  </InputLabel>
                  <Select
                    value={userInfo.groups ? userInfo.groups : []}
                    onChange={evt =>
                      this.userDetailChange(
                        "groups",
                        userInfo,
                        evt.target.value,
                      )
                    }
                    input={<Input name="category" id="category-helper" />}
                    renderValue={selected => (
                      <div className={classes.chips}>
                        { selected.map(value => {
                            return (
                              <Chip
                                key={value}
                                tabIndex={-1}
                                label={value}
                                className={classes.chip}
                                onDelete={this.handleDelete(userInfo, value)}
                                deleteIcon={<CancelIcon />}
                              />
                            )
                          }
                        )}
                      </div>
                    )}
                    multiple
                  >
                    {groups.map(group => (
                      <MenuItem key={group.id} value={group.id}>
                        {group.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div className={classNames(classes.row, classes.buttonRow)}>
                <Button
                  disabled={this.isEmpty(this.state.user)}
                  variant="contained"
                  color="primary"
                  onClick={this.saveDetail.bind(this)}
                >
                  Save
                </Button>
              </div>

              {/* User Detail End */}
            </form>
          </Grid>
          {/* Setting Panel */}
          <Grid item xs={12} sm={6} className={classes.gridItem}>
            <div className={classes.row}>
              <strong>Send short message to user</strong>
            </div>
            <div className={classNames(classes.row, classes.msgRow)}>
              <div className={classes.msgField}>
                <TextField
                  disabled={!this.state.isAdmin}
                  label="Message to User"
                  id="message"
                  className={classes.textField}
                  value={this.state.message}
                  onChange={(evt) => this.setMessage(evt.target.value)}
                  margin="normal"
                  variant="outlined"
                  helperText={this.state.helperText}
                />
              </div>
              <div className={classes.msgButtonDiv}>
                <Button
                  disabled={this.state.message.length > 0 ? false : true}
                  variant="contained"
                  onClick={this.sendMessage.bind(this)}
                  className={classes.msgButton}
                  >
                  SEND
                </Button>
              </div>
            </div>

            <div className={classNames(classes.row, classes.internalNoteRow)}>
                <TextField
                  id="internalnote"
                  label="Internal Note"
                  fullWidth
                  multiline
                  rows="2"
                  value={userInfo.internalnote}
                  onChange={evt =>
                    this.userDetailChange("internalnote", userInfo, evt.target.value)
                  }
                  className={classes.internalNote}
                  margin="normal"
                />
            </div>
          </Grid>

          {/* User Data Start */}
          <Grid item xs={12} sm={6} className={classes.gridItem}>
            <div className={classes.row}>
              <TextField
                disabled
                label="Internal UserID"
                id="userId"
                className={classes.textField}
                value={userInfo.userId}
                onChange={evt =>
                  this.userDetailChange("userId", userInfo, evt.target.value)
                }
                margin="normal"
              />
              <TextField
                disabled
                id="version"
                label="Version"
                className={classes.textField}
                value={userInfo.userId}
                onChange={evt =>
                  this.userDetailChange("created", userInfo, evt.target.value)
                }
                margin="normal"
              />
            </div>
            <div className={classes.row}>
              <TextField
                disabled
                label="Login Provider"
                id="loginprovider"
                className={classes.textField}
                defaultValue=""
                margin="normal"
              />
              <TextField
                disabled
                label="Distance"
                id="distannce"
                className={classes.textField}
                value={getDistanceString(userInfo.totaldistance) + "km"}
                onChange={evt =>
                  this.userDetailChange(
                    "totaldistance",
                    userInfo,
                    evt.target.value,
                  )
                }
                margin="normal"
              />
            </div>
            <div className={classes.row}>
              <TextField
                id="gxp"
                label="GXP"
                type="number"
                InputProps={{ inputProps: { min: 0 } }}
                className={classes.textField}
                value={userInfo.gxp}
                onChange={evt =>
                  this.userDetailChange("gxp", userInfo, evt.target.value)
                }
                margin="normal"
              />
              <TextField
                disabled
                label="Frequency"
                id="frequency"
                className={classes.textField}
                value={userInfo.frequency}
                onChange={evt =>
                  this.userDetailChange("frequency", userInfo, evt.target.value)
                }
                margin="normal"
              />
              <TextField
                disabled
                label="YGI"
                id="ygi"
                className={classes.textField}
                value={userInfo.ygi}
                onChange={evt =>
                  this.userDetailChange("ygi", userInfo, evt.target.value)
                }
                margin="normal"
              />
            </div>
          </Grid>
          {/* User Data End */}
          {/* Overlap Map */}
          <Grid item xs={12} sm={6} className={classes.gridItem}>

          </Grid>
          <Grid item xs={12} md={6} className={classes.gridItem}>
            <div className={classNames(classes.subTitle, "flex")}>
                <div className={classes.subTitleWrapper}>
                  <strong>User Ping Trail</strong>
                </div>
                <div className={classNames(classes.gmapButtonWrapper, "flex")}>
                  <Button
                      variant="contained"
                      color="primary"
                      className={classes.gmapButton}
                      onClick={this.showMap}
                      >
                      Ping Plotter (200)
                  </Button>
                </div>
            </div>

            <FuseAnimate animation="transition.slideUpIn" delay={100}>
              <div>
                <ReactTable
                  className={classNames(
                    classes.root,
                    "-striped -highlight border-0",
                  )}
                  getTrProps={(state, rowInfo, column) => {
                    return {
                      className: "cursor-pointer",
                      onClick  : (e, handleOriginal) => {
                          if ( rowInfo )
                          {
                            this.setState({
                              showMap: true,
                              trailPingToShow: [rowInfo.original]
                            })
                          }
                      }
                    }
                  }}
                  data={trailPings}
                  columns={[
                    {
                      Header: "Time Stamp",
                      accessor: "clientdate",
                      width: this.state.boxWidth * 0.35,
                      Cell: row => {
                        return this.formatDateTime(row.value);
											},
											style: { justifyContent: "center" }
                    },
                    {
                      Header: "Ping No",
                      accessor: "epoch",
											width: this.state.boxWidth * 0.25,
											style: { justifyContent: "center" }
                    },
                    {
                      Header: "Coordinate",
                      accessor: "location",
											width: this.state.boxWidth * 0.4,
											style: { justifyContent: "center" },
											Cell: row => {
                        return row.value.lat.toFixed(3) + " / " + row.value.lng.toFixed(3);
                      },
                    },
                  ]}
                  defaultPageSize={10}
                  // pageSize={ this.state.pageLength}
                  // showPagination={false}
                  noDataText="No Trails Pings Are Found"
                  defaultSorted={[
                    {
                      id: "clientdate",
                      desc: true,
                    },
                  ]}
                />

              </div>
            </FuseAnimate>
          </Grid>

          {/* Zones Table */}
          <Grid item xs={12} md={6} className={classes.gridItem}>
            <div className={classes.subTitle + " flex"}>
              <strong>Visited Zones</strong>
            </div>
            <FuseAnimate animation="transition.slideUpIn" delay={100}>
              <ReactTable
                className={classNames(
                  classes.root,
                  "-striped -highlight border-0",
                )}
                getTrProps={(state, rowInfo, column) => {
                  return {
                    className: "cursor-pointer",
                  };
                }}
                data={userInfo.zones}
                columns={[
                  {
                    Header: "Zone Name",
                    accessor: "name",
                    filterable: false,
                    className: "font-bold",
                    width: this.getColumnWidth("name"),
                  },
                  {
                    Header: "Zone Type",
                    accessor: "type",
                    width: this.getColumnWidth("type"),
										style: { justifyContent: "center" }
                  },
                  {
                    Header: "Count",
                    accessor: "count",
										width: this.getColumnWidth("count"),
										style: { justifyContent: "center" }
                  },
                  {
                    Header: "Ping",
										accessor: "lastvisit",
                    width: this.getColumnWidth("lastvisit"),
                    Cell: row => {
                      return this.formatDateTime(row.value);
                    },
										style: { justifyContent: "center" }
                  },
                ]}
                defaultPageSize={10}
                noDataText="No zones found"
                defaultSorted={[
                  {
                    id: "count",
                    desc: true,
                  },
                ]}
              />
            </FuseAnimate>
          </Grid>
        </Grid>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getUserDetail: Actions.getUserDetail,
      updateUserDetail: Actions.updateUserDetail,
      getUserData: Actions.getUserData,
      toggleInSelectedContacts: Actions.toggleInSelectedContacts,
      selectAllContacts: Actions.selectAllContacts,
      deSelectAllContacts: Actions.deSelectAllContacts,
      getCountries: Actions.getCountries,
      getAirports: Actions.getAirPorts,
      getPings: Actions.getPings,
      getGroups: Actions.getGroups,
      getTrailPings: Actions.getTrailPings,
      getTotalRecords: Actions.getTotalRecords,
      sendMessage: Actions.sendMessage,
    },
    dispatch,
  );
}

function mapStateToProps({ contactsApp }) {
  return {
    user: contactsApp.user,
    contacts: contactsApp.contacts.entities,
    selectedContactIds: contactsApp.contacts.selectedContactIds,
    searchText: contactsApp.contacts.searchText,
    countries: contactsApp.contacts.countries,
    airports: contactsApp.contacts.airports,
    pings: contactsApp.contacts.pings,
    groups: contactsApp.contacts.groups,
    trailPings: contactsApp.contacts.trailPings,
    totalRecords: contactsApp.contacts.totalRecords,
  };
}

export default withReducer("contactsApp", reducer)(
  withStyles(styles, { withTheme: true })(
    withRouter(
      connect(
        mapStateToProps,
        mapDispatchToProps,
      )(UserDetailApp),
    ),
  ),
);
