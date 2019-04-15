cwd=$(pwd)

cd $(pwd)/restauranteApi

echo "TESTING"
VALID="$(npm test | grep -o 'failing')"

if [[ $VALID != "failing" ]]
   then
cd $cwd/restauranteApi && sudo ./container-up.sh; bash &
cd $cwd/restauranteApp && sudo ./container-up.sh; bash &

fi