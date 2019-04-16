FROM     ubuntu:16.04
LABEL maintainer="bitard [dot] michael [at] gmail [dot] com"

ENV DEBIAN_FRONTEND=noninteractive \
    ANDROID_HOME=/opt/android-sdk-linux \
    NODE_VERSION=10.13.0 \
    NPM_VERSION=6.4.1 \
    IONIC_VERSION=4.3.1 \
    CORDOVA_VERSION=8.1.2\
    GRADLE_VERSION=4.10.2

# Install basics
RUN apt-get update &&  \
    apt-get install -y git wget curl unzip build-essential ruby ruby-dev ruby-ffi gcc make && \
    curl --retry 3 -SLO "http://nodejs.org/dist/v$NODE_VERSION/node-v$NODE_VERSION-linux-x64.tar.gz" && \
    tar -xzf "node-v$NODE_VERSION-linux-x64.tar.gz" -C /usr/local --strip-components=1 && \
    rm "node-v$NODE_VERSION-linux-x64.tar.gz" && \
    npm install -g npm@"$NPM_VERSION" && \
    npm install -g cordova@"$CORDOVA_VERSION" ionic@"$IONIC_VERSION" && \
    npm cache clear --force

RUN apt-get install -y nginx

RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

COPY . /usr/src/app
RUN npm install
CMD ionic serve 
# RUN pwd
# RUN cp -r -v ./www /var/www/html

EXPOSE 8100



