
CODECOV_TOKEN=f6421c9b-c678-4bc9-874d-bdbbc8be5c2f;

curl -Os https://uploader.codecov.io/latest/linux/codecov
chmod +x codecov
./codecov -t ${CODECOV_TOKEN}
