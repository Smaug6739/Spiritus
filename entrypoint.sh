#!/bin/bash


# Wait for the backend to be up, if we know where it is.
# if [ -n "$CUSTOMERS_HOST" ]; then
#   echo "Test ------------------------------------------------ Test"
#   bash /usr/src/app/wait-for-it.sh "$CUSTOMERS_HOST:${CUSTOMERS_PORT:-6000}"
# fi

echo "Waiting ..."

SERVICE = $1
PORT = $2

while ! timeout 1 bash -c "echo > /dev/tcp/$SERVICE/$PORT"; do   
  sleep 1
done

echo "$SERVICE launched"

# Run the main container command.
exec "$@"