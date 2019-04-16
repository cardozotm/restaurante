cwd=$(pwd)

cd $(pwd)/restauranteApi

echo "NPM INSTALL AND AUTOMATED TESTING"
VALID="$(npm install && npm test | grep -o 'failing')"

if [[ $VALID != "failing" ]]
   then
cd $cwd/restauranteApi && sudo ./container-up.sh; bash &
cd $cwd/restauranteApp && sudo ./container-up.sh; bash &

fi  