

cd "$(dirname "$0")"
pkill -f "node server.js" #kill existing server
node server.js &
sleep 2

open http://localhost:3000/src/MainPage.html
chmod +x run.bash