import {
  Button,
  TextField,
  CircularProgress,
  Card,
  Box,
  IconButton
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import Snackbar from "@material-ui/core/Snackbar";
import Alert from "@material-ui/lab/Alert";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import GetAppIcon from "@material-ui/icons/GetApp";
import Autocomplete from "@material-ui/lab/Autocomplete";
import PropTypes from "prop-types";
import React from "react";
import { connect } from "react-redux";
import { findAll as findProvinces } from "../../../actions/province";
import { findAll as findContraceptions } from "../../../actions/contraception";
import {
  findById,
  save,
  deleteById
} from "../../../actions/contraception_user";
import styles from "../../styles";
import DeleteIcon from "@material-ui/icons/Delete";
import Swal from "sweetalert2";

class ContraceptionUserPage extends React.Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      form: {
        id: match.params.id,
        province: null,
        qty: "",
        contraception: null
      },
      provinceOptions: [],
      contraceptionOptions: [],
      error: false
    };
  }

  componentDidMount() {
    const { form } = this.state;
    if (form.id) {
      this.props.findById(form.id);
    }
  }

  componentDidUpdate(prevProps) {
    const {
      provincesData,
      contraceptionsData,
      data,
      error,
      saveError,
      history,
      saveSuccess
    } = this.props;

    if (prevProps.provincesData !== provincesData) {
      this.setState({
        provinceOptions: provincesData.list
      });
    }
    if (prevProps.contraceptionsData !== contraceptionsData) {
      this.setState({
        contraceptionOptions: contraceptionsData.list
      });
    }
    if (prevProps.data !== data) {
      this.setState({ form: data });
    } else if (prevProps.error !== error) {
      this.setState({ error: error });
    } else if (prevProps.saveError !== saveError) {
      this.setState({ error: saveError });
    }

    if (saveSuccess) {
      history.push("/contraception-users");
    }
  }

  onChange = (event) => {
    const { name, value } = event.target;
    const { form } = this.state;

    this.setState({ form: { ...form, [name]: value } });
  };

  onProvinceChange = (event, value) => {
    const { form } = this.state;
    this.setState({ form: { ...form, province: value } });
  };

  onContraceptionChange = (event, value) => {
    const { form } = this.state;
    this.setState({ form: { ...form, contraception: value } });
  };

  onDelete = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will not be able to recover this data!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "No, keep it"
    }).then((result) => {
      if (result.value) {
        this.props.deleteById(this.state.form.id);
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire("Cancelled", "Your data is safe :)", "error");
      }
    });
  };

  onProvinceOpen = () => {
    this.props.findProvinces();
  };

  onContraceptionOpen = () => {
    this.props.findContraceptions();
  };

  onProvinceTextChange = (event) => {
    const { value } = event.target;

    if (value) {
      this.props.findProvinces({ search: { name: value } });
    }
  };

  onContraceptionTextChange = (event) => {
    const { value } = event.target;

    if (value) {
      this.props.findContraceptions({ search: { name: value } });
    }
  };

  onSubmit = (event) => {
    event.preventDefault();
    const { province, contraception, qty } = this.state.form;

    if (province !== null && contraception !== null && qty !== "") {
      this.props.save(this.state.form);
    } else {
      Swal.fire("Oops...", "Please fill all the data!", "error");
    }
  };

  render() {
    const {
      classes,
      loading,
      saveError,
      provincesLoading,
      contraceptionsLoading
    } = this.props;
    const { form, error, provinceOptions, contraceptionOptions } = this.state;
    const errorData = saveError?.data || {};

    return (
      <div error={error}>
        {!loading ? (
          <Card className={classes.card}>
            {form.id ? (
              <Box display="flex" flexDirection="row-reverse">
                <IconButton className={classes.icon} onClick={this.onDelete}>
                  <DeleteIcon color={"secondary"} />
                </IconButton>
              </Box>
            ) : (
              ""
            )}

            <form
              noValidate
              className={classes.form}
              autoComplete="off"
              onSubmit={this.onSubmit}
            >
              {form.id && (
                <div className={classes.formField}>
                  <TextField
                    id="id"
                    name="id"
                    label="ID"
                    value={form.id}
                    fullWidth
                    inputProps={{ readOnly: true }}
                  />
                </div>
              )}
              <Autocomplete
                style={{ width: 300, marginBottom: 30 }}
                options={provinceOptions}
                autoHighlight
                value={form.province}
                onChange={this.onProvinceChange}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                loading={provincesLoading}
                onOpen={this.onProvinceOpen}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Province"
                    variant="outlined"
                    onChange={this.onProvinceTextChange}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "please input keywords"
                    }}
                  />
                )}
              />

              <Autocomplete
                style={{ width: 300 }}
                options={contraceptionOptions}
                autoHighlight
                value={form.contraception}
                onChange={this.onContraceptionChange}
                getOptionSelected={(option, value) => option.id === value.id}
                getOptionLabel={(option) => option.name}
                loading={contraceptionsLoading}
                onOpen={this.onContraceptionOpen}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Contraception"
                    variant="outlined"
                    onChange={this.onContraceptionTextChange}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: "please input keywords"
                    }}
                  />
                )}
              />
              <div className={classes.formField}>
                <TextField
                  id="qty"
                  name="qty"
                  label="Quantity"
                  value={form.qty}
                  onInput={(e) => {
                    e.target.value = Math.max(0, parseInt(e.target.value))
                      .toString()
                      .slice(0, 5);
                  }}
                  InputProps={{ inputProps: { min: 0, max: 10000 } }}
                  fullWidth
                  error={errorData.qty}
                  helperText={errorData.qty ? errorData.qty[0] : null}
                  onChange={this.onChange}
                  type="number"
                />
              </div>

              <div className={classes.formAction}>
                <Button
                  className={classes.buttonBack}
                  variant="contained"
                  onClick={this.onBack}
                  startIcon={<ArrowBackIcon />}
                >
                  Back
                </Button>
                <Button
                  className={classes.formButton}
                  variant="contained"
                  color="primary"
                  type="submit"
                  startIcon={<GetAppIcon />}
                  disable={loading}
                >
                  Save
                </Button>
              </div>
            </form>
          </Card>
        ) : (
          <CircularProgress className={classes.progressButton} />
        )}
        <Snackbar
          open={this.state.error}
          autoHideDuration={3000}
          onClose={() => this.setState({ error: false })}
        >
          <Alert
            onClose={() => this.setState({ error: false })}
            elevation={6}
            variant="filled"
            severity="error"
          >
            {error?.message}
          </Alert>
        </Snackbar>
      </div>
    );
  }
}

ContraceptionUserPage.propTypes = {
  classes: PropTypes.any,
  data: PropTypes.any,
  error: PropTypes.any,
  findById: PropTypes.any,
  findProvinces: PropTypes.any,
  findContraceptions: PropTypes.any,
  history: PropTypes.any,
  provincesData: PropTypes.any,
  provincesLoading: PropTypes.any,
  loading: PropTypes.any,
  match: PropTypes.any,
  save: PropTypes.any,
  saveData: PropTypes.any,
  saveError: PropTypes.any,
  saveSuccess: PropTypes.any,
  contraceptionsData: PropTypes.any,
  contraceptionsLoading: PropTypes.any,
  deleteById: PropTypes.func
};

const mapStateToProps = (state) => ({
  saveSuccess: state.ContraceptionUser.saveSuccess,
  saveData: state.ContraceptionUser.data,
  saveError: state.ContraceptionUser.error,
  data: state.ContraceptionUser.data,
  loading: state.ContraceptionUser.loading,
  error: state.ContraceptionUser.error,
  provincesData: state.Provinces.data,
  provincesLoading: state.Provinces.loading,
  provincesError: state.Provinces.error,
  contraceptionsData: state.Contraceptions.data,
  contraceptionsLoading: state.Contraceptions.loading,
  contraceptionsError: state.Contraceptions.error,
  deleteData: state.Province.data
});

const mapDispatchToProps = {
  findProvinces,
  findContraceptions,
  save,
  findById,
  deleteById
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(ContraceptionUserPage)
);
