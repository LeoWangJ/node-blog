#! /bin/sh
cd /Users/leowang/node-blog/server/logs
cp access.log $(date +%Y-%m-%d).access.log
echo "" > access.log