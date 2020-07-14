import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import {loginUser} from '../../redux/users/user.actions.js';
import { connect } from 'react-redux';

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

const useStyles = (theme) => ({
  paper: {
    marginTop: 0,
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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
});

class SignIn extends React.Component {
    constructor(){
        super();
        this.state = {
            email: '',
            password: '',
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
            let dataToSubmit = {
                email: this.state.email,
                password: this.state.password
            }
            this.props.dispatch(loginUser(dataToSubmit))
            .then(response => {
              console.log(response.payload)
                if(response.payload.status === 'success'){
                    window.setTimeout(() => {
                        this.props.history.push('/');
                     }, 1000)
                }else{
                    this.setState({error: ['OOPS!' + response.payload.message]})
                }
            })
            .catch((err)=> this.setState({error: ['OOPS! ' + `Incorrect Email Passowrd Combination`]}) )
    }

    handleChange = (event) => {
        const {name, value} = event.target;
        this.setState( {[name]: value} )
    }

  render() {
    const {classes} = this.props
    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            {
                this.state.error.length ? (
                    <div className="error-alert">
                        {this.displayError(this.state.error)}
                    </div>
                ) : null
            }
            <form className={classes.form} onSubmit={this.handleSubmit} noValidate>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                onChange={this.handleChange}
                value={this.state.email}
              />
    
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                onChange={this.handleChange}
              />
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid>
                <Grid item>
                  <Link href="/register" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>
            </form>
          </div>
          <Box mt={8}>
            <Copyright />
          </Box>
        </Container>
      );
  }
}
const mapStateToProps = (state) => {
    return({
        user: state.user
    })
}

export default connect(mapStateToProps)(withStyles(useStyles)(SignIn))