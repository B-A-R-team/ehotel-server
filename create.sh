#!/bin/bash
# 创建新模块

if [ "$1" != "" ]
  then
  echo '正在创建模块...';
  nest g module modules/$1
  nest g service modules/$1
  nest g controller modules/$1
  touch src/entities/$1.entity.ts
  echo "CREATE src/entities/$1.entity.ts"
else
  echo '请输入要创建的模块名';
fi