import { CurrentWeatherFreeResponse } from '@/types/currentWeather';
import { Opacity } from '@mui/icons-material';
import {
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography,
} from '@mui/material';

interface WeatherMetricsProps {
  icon: React.ComponentType<any>;
  title: string;
  metric: number;
  unit: string;
  subtitle?: string;
  showProgress?: boolean;
  progressValue?: number;
  iconColor?: string;
  gridProps?: object;
}

export const WeatherMetrics: React.FC<WeatherMetricsProps> = ({
  icon: IconComponent,
  title,
  metric,
  unit,
  subtitle,
  showProgress = false,
  progressValue,
  iconColor = 'primary.main',
  gridProps = { xs: 6, md: 3 },
}) => {
  return (
    <Grid {...gridProps}>
      <Card
        elevation={4}
        sx={{
          height: '100%',
          borderRadius: 4,
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <CardContent
          sx={{
            textAlign: 'center',
            py: 4,
            height: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <IconComponent
            sx={{
              color: iconColor,
              mb: 2,
              fontSize: '2.5rem',
            }}
          />
          <Typography
            variant="body2"
            color="text.secondary"
            sx={{
              mb: 1,
              textTransform: 'uppercase',
              letterSpacing: 1,
            }}
          >
            {title}
          </Typography>
          <Typography
            variant="h5"
            sx={{ fontWeight: 500, mb: showProgress ? 1 : 0.5 }}
          >
            {metric}
            {unit}
          </Typography>
          {subtitle && (
            <Typography variant="body2" color="text.secondary">
              {subtitle}
            </Typography>
          )}
          {showProgress && progressValue !== undefined && (
            <LinearProgress
              variant="determinate"
              value={progressValue}
              sx={{
                mt: 1,
                height: 6,
                borderRadius: 3,
                width: '80%',
                mx: 'auto',
              }}
            />
          )}
        </CardContent>
      </Card>
    </Grid>
  );
};
