dt=$(date '+%Y-%m-%d:%H:%M')
environ=$1
msg="deploy/client/$environ/$(date '+%Y-%m-%d-%H-%M')"
echo "tagging" $msg
git tag -a $msg -m $msg
