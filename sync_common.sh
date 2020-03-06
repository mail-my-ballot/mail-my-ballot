#!/bin/sh

# We're using this script because webpack doesn't like symlinks

watch --precise --interval 0.1 \
  'rsync -ru packages/common packages/client/src/'
