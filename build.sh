set -x
rm -rf ../static/*
yarn run build
cp -r dist/* ../static/
