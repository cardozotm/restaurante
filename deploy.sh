cwd=$(pwd)

cd $(pwd)/restauranteApi

echo "TESTING"
VALID="$(npm test | grep -o 'failing')"

if [[ $VALID != "failing" ]]
   then
xterm -e "cd $cwd/restauranteApi && sudo ./container-up.sh; bash" &
xterm -e "cd $cwd/restauranteApp && sudo ./container-up.sh; bash" &

fi