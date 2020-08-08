

```
faas template pull git@github.com:orefalo/node12-apollo.git
faas new --list
faas new --lang node12-apollo-federation myfn --prefix docker.snapcore.com
faas up -f myfn.yml
echo "{hello}" | faas-cli invoke myfn
faas logs myfn
```