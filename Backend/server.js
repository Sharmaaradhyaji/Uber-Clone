import http from 'http';  // Use import instead of require
import app from './app.js';  // Ensure app is exported using `export default` in the app file

const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
