dt=$(date '+%Y-%m-%d:%H:%M')
environ=$1
tag="deploy/client/$environ/$(date '+%Y-%m-%d-%H-%M')"
echo "tagging" $tag
git tag -a $tag -m $tag
git push origin $tag
