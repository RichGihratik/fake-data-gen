import { AppBar, Paper, Typography, Toolbar } from '@mui/material';
import { UserTable } from './user-table';
import { GenOptions } from './GenOptions';

export function MainView() {
  return (
    <Paper className="min-h-screen">
      <AppBar position="sticky">
        <Toolbar>
          <Typography
            variant="h6"
            fontWeight="bold"
            component="div"
            sx={{ flexGrow: 1 }}
          >
            Fake data
          </Typography>
        </Toolbar>
      </AppBar>
      <div className="p-10">
        <GenOptions />
        <UserTable />
      </div>
    </Paper>
  );
}
