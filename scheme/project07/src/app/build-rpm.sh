#!/bin/sh

VERSION=$(echo archive/* | sed  "s/[^0-9]*\([0-9.]\+\).*-\([0-9.]\+\)\..*/\1.\2/" | sed "s/-/./")

rm rpm -rf
mkdir rpm
cp archive/*.tar.gz rpm/
cp front.spec rpm/
cp Dockerfile.rpm rpm/

docker build --no-cache --build-arg VERSION=${VERSION} -t imigo-rpms -f rpm/Dockerfile.rpm rpm
docker run --name imigo-rpms-run  -d imigo-rpms tail -f /dev/null
docker cp imigo-rpms-run:/root/rpmbuild/RPMS/noarch/ .
docker stop imigo-rpms-run
docker rm imigo-rpms-run
docker rmi imigo-rpms
