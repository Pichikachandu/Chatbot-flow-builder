import { Box, AppBar, Toolbar, Typography, Button, styled, IconButton } from '@mui/material';
import { Logout, Settings, HelpOutline } from '@mui/icons-material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.05)',
  borderBottom: `1px solid ${theme.palette.divider}`,
}));

const LogoText = styled(Typography)({
  fontWeight: 700,
  background: 'linear-gradient(90deg, #4F46E5 0%, #7C3AED 100%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  marginRight: '40px',
});

const NavButton = styled(Button)(({ theme }) => ({
  margin: '0 4px',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: 'transparent',
  },
}));

const ActionButton = styled(IconButton)(({ theme }) => ({
  marginLeft: '8px',
  color: theme.palette.text.secondary,
  '&:hover': {
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.action.hover,
  },
}));

export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <StyledAppBar position="static" color="default">
        <Toolbar>
          <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
            <LogoText variant="h6" noWrap>
              Chatbot Flow Builder
            </LogoText>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <NavButton>Dashboard</NavButton>
              <NavButton>Flows</NavButton>
              <NavButton>Analytics</NavButton>
              <NavButton>Templates</NavButton>
            </Box>
          </Box>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <ActionButton size="large" aria-label="Help">
              <HelpOutline />
            </ActionButton>
            <ActionButton size="large" aria-label="Settings">
              <Settings />
            </ActionButton>
            <ActionButton size="large" aria-label="Account">
              <Logout />
            </ActionButton>
          </Box>
        </Toolbar>
      </StyledAppBar>
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        {children}
      </Box>
      <Box
        component="footer"
        sx={{
          py: 2,
          px: 3,
          mt: 'auto',
          backgroundColor: 'background.paper',
          borderTop: `1px solid`,
          borderColor: 'divider',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="body2" color="text.secondary">
            © {new Date().getFullYear()} FlowBuilder Pro. All rights reserved.
          </Typography>
          <Box>
            <Button size="small" color="inherit">
              Privacy
            </Button>
            <Button size="small" color="inherit">
              Terms
            </Button>
            <Button size="small" color="inherit">
              Contact
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default MainLayout;
