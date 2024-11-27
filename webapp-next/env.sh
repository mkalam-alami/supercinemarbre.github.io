#!/bin/sh

TIMESTAMP=`date +%s`
echo "VUE_APP_BUILD_TIME=${TIMESTAMP}" > .env