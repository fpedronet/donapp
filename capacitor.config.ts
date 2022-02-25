import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.sistemas.donapp',
  appName: 'donapp',
  webDir: 'www',
  bundledWebRuntime: false,
  plugins: {
    GoogleAuth: {
      scopes: ['profile', 'email'],
      serverClientId: '452716635907-p5msqilrnhs7jigp47b4q4vv8q6btjhe.apps.googleusercontent.com',
      forceCodeForRefreshToken: true,
    },
  },
};

export default config;
