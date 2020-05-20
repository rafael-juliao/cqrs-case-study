echo "Deleting Delay Containers"
docker ps -a | awk '{ print $1,$2 }' | grep gaiadocker/iproute2 | awk '{print $1 }' | xargs -I {} docker rm {}