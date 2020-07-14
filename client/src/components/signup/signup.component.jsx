import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {connect} from 'react-redux';
import {signupUser} from '../../redux/users/user.actions.js';

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const useStyles = theme => ({
  paper: {
    marginTop: theme.spacing(0),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    marginTop: theme.spacing(5),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignUp extends React.Component {

  constructor(){
    super();
    this.state = {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        passwordConfirm: '',
        error: []
    }
}
displayError = (errors) => (
    errors.map((error,i) => <p key={i}> {error} </p>)
)
handleSubmit = async(event) => {
    event.preventDefault();
        if(!this.state.email || !this.state.password){
            if(!this.state.email)this.setState({error: ['please provide login email']});
            if(!this.state.password)this.setState({error: ['please provide login password']})
            return;
        }
        if(this.state.passwordConfirm !== this.state.password){
          this.setState({error: ['provided passwords does not match']})
          return;
      }
        let dataToSubmit = {
            firstName: this.state.firstName,
            lastName: this.state.lastName,
            email: this.state.email,
            password: this.state.password,
            passwordConfirm: this.state.passwordConfirm
        }
        this.props.dispatch(signupUser(dataToSubmit))
        .then(response => {
          console.log(response)
            if(response.payload.status === 'success'){
                this.setState({error: ['Welcome ' + response.payload.data.user.name]})
                window.setTimeout(() => {
                    this.props.history.push('/');
                 }, 2000)
            }else{
                this.setState({error: ['OOPS!' + response.payload.message]})
            }
        })
        .catch((err)=> {
          this.setState({error: ['OOPS! ' + err.response.data.message]}) 
          console.log( err.response.data.message)
        })
}

handleChange = (event) => {
    const {name, value} = event.target;
    this.setState( {[name]: value} )
}

  render(){
    const {classes} = this.props
    return (
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign up
          </Typography>
          <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  autoComplete="fname"
                  name="firstName"
                  variant="outlined"
                  required
                  fullWidth
                  id="firstName"
                  label="First Name"
                  autoFocus
                  onChange={this.handleChange}
                  value={this.state.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="lastName"
                  label="Last Name"
                  name="lastName"
                  autoComplete="lname"
                  onChange={this.handleChange}
                  value={this.state.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  name="email"
                  autoComplete="email"
                  onChange={this.handleChange}
                  value={this.state.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="password"
                  label="Password"
                  type="password"
                  id="password"
                  autoComplete="current-password"
                  onChange={this.handleChange}
                  value={this.state.password}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  variant="outlined"
                  required
                  fullWidth
                  name="passwordConfirm"
                  label="PasswordConfirm"
                  type="password"
                  id="passwordConfirm"
                  autoComplete="current-password"
                  onChange={this.handleChange}
                  value={this.state.passwordConfirm}
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              Sign Up
            </Button>
            <Grid container justify="flex-end">
              <Grid item>
                <Link href="/login" variant="body2">
                  Already have an account? Sign in
                </Link>
              </Grid>
            </Grid>
          </form>
        </div>
        <Box mt={5}>
          <Copyright />
        </Box>
      </Container>
    );
  }
}
const mapStateToProps = (state) => {
  return({
    user : state.user
  })
}
export default connect(mapStateToProps)(withStyles(useStyles)(SignUp))