import path from 'path';

const projectRoot = process.cwd();

const stats = {
  chunks: false,
  chunkModules: false,
  colors: true,
  errors: true,
  errorDetails: true,
  modules: false,
  publicPath: true,
  reasons: true,
  warnings: true
};

const constants = {
  host: process.env.HOST || 'localhost',
  port: process.env.PORT || 5001,
  src: path.resolve(projectRoot, 'src/'),
  entry: path.resolve(projectRoot, 'src/index.tsx'),
  build: path.resolve(projectRoot, 'build'),
  html: path.resolve(projectRoot, 'src/index.html'),
  projectRoot,
  stats
};

export default constants;
