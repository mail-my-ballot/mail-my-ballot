env-cmd  -f ./env/.env.$1 envsubst < app.tmpl.yaml > app.yaml
