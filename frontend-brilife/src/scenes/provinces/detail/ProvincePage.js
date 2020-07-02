import {
  Box,
  Button,
  Card,
  CircularProgress,
  IconButton,
  TextField
} from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";
import DeleteIcon from "@material-ui/icons/Delete";
import GetAppIcon from "@material-ui/icons/GetApp";
import PropTypes from "prop-types";
import React, { Component } from "react";
import { connect } from "react-redux";
import Swal from "sweetalert2";
import SweetAlert from "sweetalert2-react";
import { deleteById, findById, save } from "../../../actions/province";
import styles from "../../styles.js";
class ProvincePage extends Component {
  constructor(props) {
    super(props);

    const { match } = this.props;

    this.state = {
      form: {
        id: match.params.id,
        name: ""
      },
      error: false
    };

    this.onDrop = this.onDrop.bind(this);
  }

  componentDidMount() {
    const { form } = this.state;
    if (form.id) {
      this.props.findById(form.id);
    }
  }

  componentDidUpdate(prevProps) {
    const { saveError, data, error, history, saveSuccess } = this.props;

    if (prevProps.data !== data) {
      this.setState({ form: data });
    } else if (prevProps.saveError !== saveError) {
      this.setState({ error: saveError });
    } else if (prevProps.error !== error) {
      this.setState({ error: error });
    }

    if (saveSuccess) {
      history.push("/provinces");
    }
  }

  onChange = (event) => {
    const { name, value } = event.target;
    const { form } = this.state;
    this.setState({ form: { ...form, [name]: value } });
  };

  onSubmit = (event) => {
    event.preventDefault();

    this.props.save(this.state.form);
  };

  onBack = () => {
    this.props.history.push("/provinces");
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

  onDrop(pictureFiles) {
    const { form } = this.state;
    this.setState({ form: { ...form, imagesUpload: pictureFiles } });
  }
  render() {
    const { classes, loading, saveError } = this.props;
    const { form, error } = this.state;
    const errorData = saveError?.data || {};
    console.log(form.isUsed);
    return (
      <div error={error}>
        {!loading ? (
          <div>
            <Card className={classes.card}>
              {!form.isUsed && form.id ? (
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
                      label="Id"
                      value={form.id}
                      fullWidth
                      InputProps={{ readOnly: true }}
                    />
                  </div>
                )}
                <div className={classes.formField}>
                  <TextField
                    id="name"
                    name="name"
                    label="Name"
                    error={errorData.name}
                    value={form.name}
                    helperText={errorData.name ? errorData.name[0] : null}
                    onChange={this.onChange}
                    fullWidth
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
          </div>
        ) : (
          <CircularProgress className={classes.progressButton} />
        )}
        <SweetAlert
          show={this.state.error}
          title="Error"
          text="Failed Saving Data"
          type="error"
          onConfirm={() => this.setState({ error: false })}
        />
      </div>
    );
  }
}

ProvincePage.propTypes = {
  classes: PropTypes.any,
  data: PropTypes.any,
  error: PropTypes.any,
  findById: PropTypes.any,
  history: PropTypes.any,
  loading: PropTypes.any,
  match: PropTypes.any,
  save: PropTypes.any,
  saveData: PropTypes.any,
  saveError: PropTypes.any,
  saveSuccess: PropTypes.any,
  deleteImage: PropTypes.any,
  deleteById: PropTypes.any
};

const mapStateToProps = (state) => ({
  saveData: state.Province.data,
  saveError: state.Province.error,
  saveSuccess: state.Province.saveSuccess,
  data: state.Province.data,
  loading: state.Province.loading,
  error: state.Province.error,
  deleteData: state.Province.data
});

const mapDispatchToProps = {
  save,
  findById,
  deleteById
};

export default withStyles(styles, { withTheme: true })(
  connect(mapStateToProps, mapDispatchToProps)(ProvincePage)
);
