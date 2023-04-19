// @mui
import { styled } from '@mui/material/styles';
import { Container, Typography, Stack, Button, Box } from '@mui/material';
// hooks
import useResponsive from '../hooks/useResponsive';
// components
// sections
import { FcGoogle } from 'react-icons/fc'
import { handleGoogleSignIn } from '../utils/auth';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '../context/AuthContext';
import LottieBucket from '../components/common/LottieBucket';
import loginLottie from '../animations/ecommerce-online-shop-blue.json'
import { useDispatch } from 'react-redux';

const StyledRoot = styled('div')(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex',
  },
}));

const StyledSection = styled('div')(({ theme }) => ({
  width: '100%',
  maxWidth: 480,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  boxShadow: theme.customShadows.card,
  backgroundColor: theme.palette.background.default,
}));

const StyledContent = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  padding: theme.spacing(12, 0),
}));


export default function LoginPage() {
  const mdUp = useResponsive('up', 'md');
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { setUserDetails, currentUser } = useContext(AuthContext);

  const handleSignIn = () => {
    handleGoogleSignIn(navigate, setUserDetails, dispatch)
  }
  useEffect(() => {
    if (currentUser) {
      navigate('/dashboard')
    }
  }, [currentUser, navigate])

  return (
    <>
      <StyledRoot>


        {mdUp && (
          <StyledSection>
            <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
              Hi, Welcome Back
            </Typography>
            <img src="/assets/illustrations/illustration_login.png" alt="login" />
          </StyledSection>
        )}


        <Container maxWidth="sm">
          <StyledContent>
            <Box mb={10}>
              {!mdUp && (
                <LottieBucket path={loginLottie} />
              )}
            </Box>

            <Box>

              <Typography variant="h4" gutterBottom>
                Sign in to Apna Market
              </Typography>

              <Typography variant="body2" sx={{ mb: 5 }}>
                to become a part of Apna Market
              </Typography>

              <Stack direction="row" spacing={2}>
                <Button onClick={handleSignIn} fullWidth size="large" color="inherit" variant="outlined">
                  <FcGoogle size={30} /> <span className='ml-3'>Sign In with Google</span>
                </Button>
              </Stack>

            </Box>
            {/* <Divider sx={{ my: 3 }}>
              <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                OR
              </Typography>
            </Divider> */}

            {/* <LoginForm /> */}
          </StyledContent>

        </Container>
      </StyledRoot>
    </>
  );
}
