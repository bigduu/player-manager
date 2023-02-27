set -x
rm -rf ../../RustProjects/broadcast/static/*
yarn run build
cp -r dist/* ../../RustProjects/broadcast/static/
