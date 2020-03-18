dt=$(date '+%Y-%m-%d:%H:%M')
package=$1
environ=$2
tag="deploy/$package/$environ/$(date '+%Y-%m-%d-%H-%M')"
echo "tagging" $tag
git tag -a $tag -m $tag
git push origin $tag
